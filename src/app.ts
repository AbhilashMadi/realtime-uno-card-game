import { createFastifyServer, envConfig } from "@configs";
import { banner } from "@utils";
import registerRoutes from "./routes/index.js";

// Create Fastify instance
const app = await createFastifyServer();

// Register routes
registerRoutes(app);

// Start server
const PORT = envConfig.SERVER_PORT;
app
	.listen({ port: PORT, host: envConfig.HOST })
	.then((address) => {
		banner(envConfig);
		app.log.info(`Server running at ${address}`);
	})
	.catch((err) => {
		console.error("Failed to start server:", err);
		process.exit(1);
	});
