import { type RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ json, send, cookie }) => {
  try {
    json(200, {
      respuesta: `esta es una prueba. ${cookie.get("user-session")?.value}`,
    });
  } catch (error) {
    send(500, JSON.stringify(error));
  }
};
