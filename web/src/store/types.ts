import { RawStep } from "../../../common/types/Step";
import { PracticeSession } from "../../../common/types/PracticeSession";
import { ModalRef } from "@/lib/modals/modals";

export type Status = "clean" | "pending" | "dirty";

export interface WithStatus {
  status: Status;
}

export interface AuthState {
  uid: string;
}

export interface StepsState extends WithStatus {
  rawSteps: RawStep[];
}

export interface CurrentStepState extends WithStatus {
  raw: RawStep | null;
}

export interface PracticeSessionsState extends WithStatus {
  sessions: PracticeSession[];
}

export interface SelectedSessionState extends WithStatus {
  session: PracticeSession | null;
}

export interface ModalsState {
  stack: ModalRef[];
}

export interface RootState {
  auth: AuthState;
  steps: StepsState;
  currentStep: CurrentStepState;
  practiceSessions: PracticeSessionsState;
  selectedSession: SelectedSessionState;
}
