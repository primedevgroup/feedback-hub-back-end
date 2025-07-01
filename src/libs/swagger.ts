import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import path from "path";
import yaml from "js-yaml";
import fs from "fs";

export default fp(async (fastify) => {
  const filePath = path.join(__dirname, "../../swagger.yaml");
  const doc = yaml.load(
    fs.readFileSync(filePath, "utf8")
  ) as import("openapi-types").OpenAPIV3.Document;
  await fastify.register(swagger, {
    mode: "static",
    specification: {
      document: doc,
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
    },
  });
});
