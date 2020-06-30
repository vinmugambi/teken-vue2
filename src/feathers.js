import feathers from "@feathersjs/feathers";
// import socketio from "@feathersjs/socketio-client";
import restClient from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
// import io from "socket.io-client";
import { provide} from "@vue/composition-api";

const rest= restClient("http://localhost:3030");

// const socket = io("http://localhost:3030", { transports: ["websocket"] });

const feathersClient = feathers()
  // .configure(socketio(socket))
  .configure(rest.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));

export const provideFeathers = () => {
  provide("feathers", feathersClient);
};

feathersClient.service("visa").hooks({
  before: {
    // find: [async context=>{
    //   console.log(context.params)
    // }]
  },
  after: {
    // find: [async context => {

    // }]
  },
  error: {all: [
    async context => {
      console.log(context.service.name, context.method, context.error);
    }
  ]}
})
export default feathersClient;
