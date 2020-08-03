import { DatabaseItem } from "./common/DatabaseItem";
import { Owned } from "./common/Owned";

export interface OpenSession {
  status: "open";
}

export interface ClosedSession {
  status: "closed";
  closed_at: number;
}

type SessionStatus = OpenSession | ClosedSession;

export type PracticeSession = SessionStatus &
  DatabaseItem &
  Owned & {
    steps: string[];
  };
