import { createServer, Factory, Model } from "miragejs";
import { IEntity } from "../hooks/useEntities";
import { ITask } from "../hooks/useTasks";

export function makeServer() {
  const server = createServer({
    models: {
      entity: Model.extend<IEntity>({} as IEntity),
      task: Model.extend<ITask>({} as ITask),
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
      task: Factory.extend({
        id() {
          return Math.ceil(Math.random() * 10000);
        },
        description() {
          return `Task description example`;
        },
        state() {
          return `Fazer`;
        },
      }),
    },

    seeds(server) {
      // server.createList("entity", 10);
      // server.createList("task", 5);
    },

    routes() {
      this.namespace = "api";
      this.timing = 1500;

      // ROTAS DAS ENTIDADES
      this.get("/entities");
      this.post("/entities", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        if (data.name === "") {
          throw Error("A Entidade deve conter um nome.");
        }

        if (!data.id || schema.findBy("entity", { id: data.id })) {
          throw Error("ID Inválido ou já está em uso.");
        }

        if (data.type === "user" && !data.group.id) {
          throw Error("Deve associar Usuário com um Grupo.");
        }

        return schema.create("entity", {
          ...data,
          group:
            data.type === "group"
              ? undefined
              : {
                  id: data.group.id,
                  name: schema.findBy("entity", { id: data.group.id })?.name,
                },
          created_at: "100",
          tasks: [],
        });
      });

      this.put("/entities", (schema, request): any => {
        const data = JSON.parse(request.requestBody);

        if (!data.name) {
          throw Error("A Entidade deve conter um nome.");
        }

        return schema.findBy("entity", { id: data.id })?.update({
          ...data,
          group: {
            id: data.group.id,
            name: schema.findBy("entity", { id: data.group.id })?.name,
          },
        });
      });

      this.delete("/entities/:id", (schema, request): any => {
        const id = request.params.id;

        schema.where("entity", (entity) => entity?.group.id === id).destroy();
        schema.where("task", (task) => task.group?.id === id).destroy();

        return schema.find("entity", id)?.destroy();
      });

      // ROTAS DAS TAREFAS
      this.get("/tasks");

      this.get("/tasks/user/:id", (schema, request): any => {
        const id = request.params.id;

        const userTasks = schema
          .all("task")
          .filter((task) => task.user.id === id);

        return userTasks;
      });

      this.post("tasks", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        if (data.description === "") {
          throw Error("A tarefa deve conter uma descrição.");
        }

        if (Number(data.time_to_finish) <= 0 || data.time_to_finish == "") {
          throw Error("Tempo inválido.");
        }

        const date1: any = new Date();

        if (data.group_id === "") {
          throw Error("A tarefa deve ser associada com um grupo.");
        }

        return schema.create("task", {
          ...data,
          id: Math.ceil(Math.random() * 10000),
          state: "fazer",
          user: {
            id: data.user_id,
            name: data.user_id
              ? schema.findBy("entity", { id: data.user_id })?.name
              : "---",
          },
          group: {
            id: data.group_id,
            name: data.group_id
              ? schema.findBy("entity", { id: data.group_id })?.name
              : "---",
          },
          time_to_finish: new Date(
            date1.getTime() + Number(data.time_to_finish) * 60 * 1000
          ),
        });
      });

      this.put("/tasks", (schema, request): any => {
        const data = JSON.parse(request.requestBody);

        if (data.description == "") {
          throw Error("A tarefa deve conter uma descrição.");
        }

        if (data.group_id == "") {
          throw Error("A tarefa deve ser associada com um grupo.");
        }

        return schema.findBy("task", { id: data.id })?.update(data);
      });

      this.delete("/tasks/:id", (schema, request): any => {
        const id = request.params.id;

        return schema.find("task", id)?.destroy();
      });

      // ROTAS DO USUÁRIO
      this.get("/users", (schema, request): any => {
        const users = schema.all("entity");

        return users.filter((entity) => entity.type === "user");
      });

      this.get("/user/:id", (schema, request): any => {
        const id = request.params.id;

        const user = schema.find("entity", id);

        if (!user) {
          throw Error("ID incorreto.");
        }

        return user;
      });

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
