import fastify from "fastify";
import { routes } from "./presentation/routes";

const server = fastify();

server.register(routes);

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Http server running! 🚀");
  });
