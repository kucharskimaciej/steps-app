import { PracticeSession } from "../../../../common/types/PracticeSession";
import { range } from "lodash";

export function sessionsFactory(): PracticeSession[] {
  return [
    {
      id: "session-1",
      owner_uid: "user-1",
      locked: false,
      name: "Pusta sesja",
      steps: [],
      created_at: Date.now() - 10
    },
    {
      id: "session-5",
      owner_uid: "user-1",
      locked: false,
      name: "A practice session",
      steps: ["step-1", "step-2", "step-3"],
      created_at: Date.now() - 9
    },
    {
      id: "session-2",
      owner_uid: "user-1",
      locked: false,
      name: "Tepy",
      steps: ["step-1", "step-2", "step-3", "step-4"],
      created_at: Date.now() - 8
    },
    {
      id: "session-3",
      owner_uid: "user-1",
      locked: false,
      name: "Prywatna z nowaczkami 23/03",
      steps: ["step-1", "step-2", "step-3", "step-4"],
      created_at: Date.now() - 7
    },
    {
      id: "session-4",
      owner_uid: "user-1",
      locked: true,
      name: "Another practice session",
      steps: ["step-1", "step-2", "step-3"],
      created_at: Date.now() - 6
    }
  ];
}

export function makeSession({
  steps = 3,
  longName = false
}: {
  steps?: number;
  longName?: boolean;
} = {}): PracticeSession {
  const session: Partial<PracticeSession> = {
    id: "session-1",
    owner_uid: "user-1",
    created_at: Date.now()
  };

  session.steps = range(steps).map(idx => `step-${idx}`);

  if (longName) {
    session.name =
      "Vivamus in vulputate ligula. Nullam eleifend erat a cursus dictum.";
  } else {
    session.name = "Vivamus in vulputate ligula";
  }

  return session as PracticeSession;
}
