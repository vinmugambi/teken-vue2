import feathers from "@feathersjs/feathers";
// import socketio from "@feathersjs/socketio-client";
import restClient from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
// import io from "socket.io-client";
import { provide } from "@vue/composition-api";

const rest = restClient(process.env.VUE_APP_API_URL);

// const socket = io("http://localhost:3030", { transports: ["websocket"] });

const feathersClient = feathers()
  // .configure(socketio(socket))
  .configure(rest.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));

export const provideFeathers = () => {
  provide("feathers", feathersClient);
};

feathersClient.service("visa").hooks({
  before: {},
  after: {},
  error: {
    all: [
      async (context) => {
        console.error(context.service.name, context.method, context.error);
      },
    ],
  },
});
export default feathersClient;
