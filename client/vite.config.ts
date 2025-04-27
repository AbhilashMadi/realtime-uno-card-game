import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: { port: 3000, open: true },
	build: { outDir: resolve(__dirname, "../dist") },
	resolve: {
		alias: {
			"@": resolve(__dirname, "src")
		}
	},
});
