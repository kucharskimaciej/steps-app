import { Token } from "vue-typedi";
import { AppConfig } from "./config/types";

export const AppConfigToken = new Token<AppConfig>("AppConfigToken");
