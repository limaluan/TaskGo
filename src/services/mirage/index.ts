import { createServer, Factory, Model } from "miragejs";

type Entity = {
  id: string;
  name: string;
  type: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      entity: Model.extend<Partial<Entity>>({}),
    },

    factories: {
      entity: Factory.extend({
        id() {
          return Math.ceil(Math.random() * 10000);
        },
        name(i) {
          return `Entity ${i}`;
        },
        type() {
          return Math.ceil(Math.random() * 10) > 0 ? "group" : "user";
        },
        created_at() {
          return Date.now().toString();
        },
      }),
    },

    seeds(server) {
      server.createList('entity', 5)
    },

    routes() {
      this.namespace = "api";
      // this.timing = 750;

      this.get("/entities");
      this.post("/entities");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
