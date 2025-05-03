import { io, Socket } from "socket.io-client";

// Define stronger types for event handlers
type EventHandler = (...args: any[]) => void;

// Socket connection options interface
interface SocketOptions {
  url: string;
  token?: string;
  autoConnect?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
}

// Room operations interface
interface RoomOperations {
  joinRoom(roomId: string): void;
  leaveRoom(roomId: string): void;
}

export class SocketService implements RoomOperations {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private eventHandlers: Map<string, Set<EventHandler>> = new Map();
  private options: SocketOptions | null = null;

  private constructor() {}

  // Get the singleton instance of SocketService
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }

    return SocketService.instance;
  }

  // Initialize the socket connection with the given URL and options
  public init(options: SocketOptions): void {
    this.options = {
      autoConnect: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      ...options,
    };

    if (this.socket) {
      console.warn(
        "[Socket] Socket already initialized. Disconnecting previous connection.",
      );
      this.disconnect();
    }

    this.socket = io(options.url, {
      transports: ["websocket"],
      autoConnect: this.options.autoConnect,
      reconnection: true,
      reconnectionAttempts: this.options.reconnectionAttempts,
      reconnectionDelay: this.options.reconnectionDelay,
      auth: options.token ? { token: options.token } : undefined,
    });

    this.registerDefaultEvents();
  }

  /**
   * Connect to the socket server
   * @throws Error if socket is not initialized
   */
  public connect(): void {
    if (!this.socket) {
      throw new Error("[Socket] Socket not initialized. Call init() first.");
    }

    if (!this.socket.connected) {
      this.socket.connect();
    } else {
      console.warn("[Socket] Socket is already connected.");
    }
  }

  /**
   * Disconnect from the socket server and clean up resources
   */
  public disconnect(): void {
    if (!this.socket) return;

    // Clean up all event listeners
    this.clearAllEventHandlers();

    this.socket.disconnect();
    this.socket = null;
  }

  /**
   * Register an event handler
   * @param event Event name
   * @param handler Event handler function
   */
  public on(event: string, handler: EventHandler): void {
    if (!this.socket) {
      console.warn(
        "[Socket] Socket not initialized. Event will be registered once connected.",
      );
      // Store the handler for when socket is initialized
      this.storeEventHandler(event, handler);

      return;
    }

    this.storeEventHandler(event, handler);
    this.socket.on(event, handler);
  }

  /**
   * Register a one-time event handler
   * @param event Event name
   * @param handler Event handler function
   */
  public once(event: string, handler: EventHandler): void {
    if (!this.socket) {
      console.warn(
        "[Socket] Socket not initialized. Event will be registered once connected.",
      );

      return;
    }
    this.socket.once(event, handler);
  }

  /**
   * Remove an event handler
   * @param event Event name
   * @param handler Optional specific handler to remove
   */
  public off(event: string, handler?: EventHandler): void {
    if (!this.socket) return;

    if (handler) {
      this.socket.off(event, handler);
      this.removeEventHandler(event, handler);
    } else {
      this.socket.removeAllListeners(event);
      this.eventHandlers.delete(event);
    }
  }

  /**
   * Emit an event to the server
   * @param event Event name
   * @param data Optional data to send
   * @param ack Optional acknowledgment callback
   */
  public emit(event: string, data?: any, ack?: (response: any) => void): void {
    if (!this.socket) {
      console.error("[Socket] Cannot emit event. Socket not initialized.");

      return;
    }

    if (!this.socket.connected) {
      console.warn("[Socket] Socket not connected. Event will not be sent.");

      return;
    }

    if (ack) {
      this.socket.emit(event, data, ack);
    } else {
      this.socket.emit(event, data);
    }
  }

  /**
   * Join a room
   * @param roomId Room identifier
   */
  public joinRoom(roomId: string): void {
    this.emit("room:join", { roomId });
  }

  /**
   * Leave a room
   * @param roomId Room identifier
   */
  public leaveRoom(roomId: string): void {
    this.emit("room:leave", { roomId });
  }

  /**
   * Get the current socket ID
   * @returns Socket ID or null if not connected
   */
  public getSocketId(): string | null {
    return this.socket?.id ?? null;
  }

  /**
   * Check if socket is connected
   * @returns True if connected, false otherwise
   */
  public isConnected(): boolean {
    return !!this.socket?.connected;
  }

  /**
   * Reconnect to the socket server with the same options
   * @throws Error if socket was never initialized
   */
  public reconnect(): void {
    if (!this.options) {
      throw new Error(
        "[Socket] Cannot reconnect. Socket was never initialized.",
      );
    }

    this.init(this.options);
    this.connect();
  }

  /**
   * Update authentication token
   * @param token New authentication token
   */
  public updateToken(token: string): void {
    if (this.options) {
      this.options.token = token;

      // Reconnect with new token if socket is currently connected
      if (this.isConnected()) {
        this.reconnect();
      }
    }
  }

  /**
   * Register default socket events
   */
  private registerDefaultEvents(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("[Socket] Connected:", this.socket?.id);

      // Reattach all stored event handlers
      this.reattachEventHandlers();
    });

    this.socket.on("connect_error", (err) => {
      console.error("[Socket] Connection Error:", err.message);
    });

    this.socket.on("ping", () => {
      console.log("[Socket] Ping received from server");
      this.socket?.emit("pong");
    });

    this.socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });

    this.socket.on("reconnect_attempt", (attempt) => {
      console.log(`[Socket] Reconnection attempt ${attempt}`);
    });
  }

  /**
   * Store an event handler for later reattachment
   */
  private storeEventHandler(event: string, handler: EventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)?.add(handler);
  }

  /**
   * Remove a stored event handler
   */
  private removeEventHandler(event: string, handler: EventHandler): void {
    const handlers = this.eventHandlers.get(event);

    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.eventHandlers.delete(event);
      }
    }
  }

  /**
   * Reattach all stored event handlers to the socket
   */
  private reattachEventHandlers(): void {
    if (!this.socket) return;

    this.eventHandlers.forEach((handlers, event) => {
      handlers.forEach((handler) => {
        // Skip default events to avoid duplicate handlers
        if (
          ![
            "connect",
            "connect_error",
            "ping",
            "disconnect",
            "reconnect_attempt",
          ].includes(event)
        ) {
          this.socket?.on(event, handler);
        }
      });
    });
  }

  /**
   * Clear all event handlers
   */
  private clearAllEventHandlers(): void {
    if (!this.socket) return;

    this.eventHandlers.forEach((_, event) => {
      this.socket?.removeAllListeners(event);
    });

    this.eventHandlers.clear();
  }
}

export default SocketService;
