import { Container as DIContainer } from "typedi";
import { AppConfigToken } from "../tokens";
import kizomba from "./kizomba";
import zouk from "./zouk";
import { AppConfig } from "./types";

if (!import.meta.env.VITE_DANCE) {
  throw new Error("Must specify dance in environment");
}
const configs = {
  kizomba,
  zouk,
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: AppConfig | undefined =
  configs[import.meta.env.VITE_DANCE as keyof typeof configs];

if (!config) {
  throw new Error("Config not found!");
}

console.log(config);
DIContainer.set(AppConfigToken, config);
