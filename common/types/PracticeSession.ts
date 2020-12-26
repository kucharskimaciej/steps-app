import { DatabaseItem } from "./common/DatabaseItem";
import { Owned } from "./common/Owned";

export interface PracticeSession extends DatabaseItem, Owned {
  name: string;
  steps: string[];
  created_at: number;
  locked: boolean;
}
