import { createServer, Factory, Model } from "miragejs";

type Entity = {
  id: string;
  name: string;
  type: string;
  created_at: string;
  group: string;
  tasks: string[];
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
          return Math.ceil(Math.random() * 10) > 5 ? "group" : "user";
        },
        created_at() {
          return Date.now().toString();
        },
        group() {
          return "";
        },
        tasks() {
          return [];
        },
      }),
    },

    seeds(server) {
      server.createList("entity", 10);
    },

    routes() {
      this.namespace = "api";
      this.timing = 1500;

      this.get("/entities");
      this.post("/entities");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
