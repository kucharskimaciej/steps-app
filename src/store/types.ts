import { RawStep } from "../../common/types/Step";
import { PracticeSession } from "../../common/types/PracticeSession";
import { InlineEditState } from "./modules/inlineEdit";

export type Status = "clean" | "pending" | "dirty";

export interface WithStatus {
  status: Status;
}

export interface AuthState {
  uid: string;
}

export interface StepsState extends WithStatus {
  rawSteps: RawStep[];
  stepsViewedInCurrentSession: string[];
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

export interface RootState {
  auth: AuthState;
  steps: StepsState;
  currentStep: CurrentStepState;
  practiceSessions: PracticeSessionsState;
  selectedSession: SelectedSessionState;
  inlineEdit: InlineEditState;
}
