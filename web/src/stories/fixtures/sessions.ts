import {
  ClosedSession,
  PracticeSession
} from "../../../../common/types/PracticeSession";
import { range } from "lodash";

export function sessionsFactory(): PracticeSession[] {
  return [
    {
      id: "session-1",
      owner_uid: "user-1",
      status: "open",
      name: "Pusta sesja",
      steps: [],
      created_at: Date.now()
    },
    {
      id: "session-1",
      owner_uid: "user-1",
      status: "open",
      name: "A practice session",
      steps: ["step-1", "step-2", "step-3"],
      created_at: Date.now()
    },
    {
      id: "session-2",
      owner_uid: "user-1",
      status: "open",
      name: "Tepy",
      steps: ["step-1", "step-2", "step-3", "step-4"],
      created_at: Date.now()
    },
    {
      id: "session-3",
      owner_uid: "user-1",
      status: "open",
      name: "Prywatna z nowaczkami 23/03",
      steps: ["step-1", "step-2", "step-3", "step-4"],
      created_at: Date.now()
    },
    {
      id: "session-4",
      owner_uid: "user-1",
      status: "closed",
      closed_at: Date.now(),
      name: "Another practice session",
      steps: ["step-1", "step-2", "step-3"],
      created_at: Date.now()
    }
  ];
}

export function makeSession({
  steps = 3,
  longName = false,
  closed = false
}: {
  steps?: number;
  longName?: boolean;
  closed?: boolean;
} = {}): PracticeSession {
  const session: Partial<PracticeSession> = {
    id: "session-1",
    owner_uid: "user-1",
    created_at: Date.now()
  };

  session.steps = range(steps).map(idx => `step-${idx}`);

  if (closed) {
    session.status = "closed";
    (session as ClosedSession).closed_at = Date.now();
  }

  if (longName) {
    session.name =
      "Vivamus in vulputate ligula. Nullam eleifend erat a cursus dictum.";
  } else {
    session.name = "Vivamus in vulputate ligula";
  }

  return session as PracticeSession;
}
