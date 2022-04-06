import { Token } from "typedi";
import { AppConfig } from "./config/types";

export const AppConfigToken = new Token<AppConfig>("AppConfigToken");
