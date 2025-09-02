import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["cjs"],
  target: "node18",
  outDir: "build",
  clean: true,
  sourcemap: false,
  minify: false,
  dts: false,
  splitting: false,
  bundle: true,
  external: ["@prisma/client"],
  noExternal: [
    "@fastify/jwt",
    "@fastify/cors",
    "@fastify/swagger",
    "@fastify/swagger-ui",
  ],
});
