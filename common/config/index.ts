import { Container as DIContainer } from "typedi/Container";
import { AppConfigToken } from "../tokens";

if (!process.env.VUE_APP_DANCE) {
  throw new Error("Must specify dance in environment");
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`./${process.env.VUE_APP_DANCE}`);
if (!config) {
  throw new Error("Config not found!");
}

console.log(config.default);
DIContainer.set(AppConfigToken, config.default);
