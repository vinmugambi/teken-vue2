import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import io from "socket.io-client";

import { provide, inject } from "@vue/composition-api";

const socket = io("http://localhost:3030", { transports: ["websocket"] });

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }));


export const provideFeathers = () => {
  provide("feathers", feathersClient);
};

export const Feathers = () => {
  let feathers = inject("feathers");
  if (!feathers) {
    throw new Error("Feathers was not provided");
  }
  return feathers;
};
