import type { EnvConfig } from "@/config/env-config.js";
import pkg from "@root/package.json" with { type: "json" };

export default function banner(envConfig: EnvConfig) {
	console.log(`\x1b[35m
╔════════════════════════════════════════════════════════════════╗
║ 🚀  Fastify TypeScript Starter Template                        ║
╚════════════════════════════════════════════════════════════════╝
📦 Version        : ${pkg.version}
🌐 Server         : http://${envConfig.HOST}:${envConfig.SERVER_PORT}
🛠️  Environment    : ${envConfig.NODE_ENV.toUpperCase()}
📁 Project Name   : ${pkg.name}
⏰ Started At     : ${new Date().toLocaleString()}

🔧 Tech Stack     : Fastify ⚡ TypeScript ❤️ Zod 📝 Mongoose 🫴🏻 Socket.IO
✨ Ready to build something awesome!
\x1b[0m`);
}
