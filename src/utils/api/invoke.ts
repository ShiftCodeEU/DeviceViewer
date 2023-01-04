/* eslint-disable @typescript-eslint/no-explicit-any */
import tauriapi from "@tauri-apps/api";
const { invoke } = tauriapi.tauri;

const ApiInvoke = async (command: string, args?: object) => {
  if (typeof window !== "undefined") {
    let response = null;

    response = invoke(command, { ...args })
      .then((message: any) => console.log(message))
      .catch((error: any) => console.error(error));

    return response;
  }
};

export default ApiInvoke;
