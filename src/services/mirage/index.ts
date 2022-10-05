import { createServer, Factory, Model } from "miragejs";
import { EditEntityModal } from "../../components/EntityModals/EditEntityModal";

export interface IEntity {
  id: string;
  name: string;
  type: string;
  created_at: string;
  group: string;
  tasks: string[];
}

export function makeServer() {
  const server = createServer({
    models: {
      entity: Model.extend<Partial<IEntity>>({}),
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
      // server.createList("entity", 10);
    },

    routes() {
      this.namespace = "api";
      this.timing = 1500;

      this.get("/entities");
      this.post("/entities", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        if (data.name === "") {
          throw Error("A Entidade deve conter um nome.");
        }

        if (!data.id || schema.findBy("entity", { id: data.id })) {
          throw Error("ID Inválido ou já está em uso.");
        }

        if (data.type === "user" && !data.group) {
          throw Error("Deve associar Usuário com um Grupo.");
        }

        return schema.create("entity", {
          ...data,
          created_at: "100",
          tasks: [],
        });
      });

      this.put("/entities", (schema, request): any => {
        const data = JSON.parse(request.requestBody);

        if (!data.name) {
          throw Error("A Entidade deve conter um nome.");
        }

        if (data.type === "user" && !data.group) {
          throw Error("Deve associar Usuário com um Grupo.");
        }

        return schema.findBy("entity", { id: data.id })?.update(data);
      });

      this.delete("/entities/:id", (schema, request): any => {
        const id = request.params.id;

        schema.where("entity", entity => entity.group === id).destroy();

        return schema.find("entity", id)?.destroy();
      });
      
      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
