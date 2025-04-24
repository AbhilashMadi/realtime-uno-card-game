import fastifySwagger from "@fastify/swagger";
import ScalarFastifyAPIReference from "@scalar/fastify-api-reference";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const docsPlugin: FastifyPluginAsync = fp(async (fastify: FastifyInstance) => {
  // Swagger/OpenAPI setup
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "UNO Multiplayer API",
        description: `
        A real-time multiplayer UNO card game API built with Fastify and Socket.IO.
        
        Features:
        - Room creation & joining
        - Real-time gameplay with WebSockets
        - Voice chat & text chat support
        - Spectator and audience view
        - Player matchmaking

        Explore the available REST endpoints, payload structures, and socket event documentation.`,
        version: "1.0.0",
        // contact: {
        //   name: "UNO Dev Team",
        //   url: "https://github.com/your-org/uno-card-game",
        //   email: "support@uno.dev",
        // },
        // license: {
        //   name: "MIT",
        //   url: "https://opensource.org/licenses/MIT",
        // },
      },
      // externalDocs: {
      //   url: "https://github.com/your-org/uno-card-game/wiki",
      //   description: "Project wiki and additional documentation",
      // },
      tags: [{
        name: 'auth',
        description: 'Authentication-related routes (register, login, logout, me etc...)',
      }],
    },
  });

  // Scalar API Reference
  await fastify.register(ScalarFastifyAPIReference, {
    routePrefix: "/reference",
    configuration: {
      theme: "kepler", // optional: try "dark", "original", etc.
      layout: "modern",
      hideDownloadButton: false,
      showSidebar: true,
    },
  });
});

export default docsPlugin;
