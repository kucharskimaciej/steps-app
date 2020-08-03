import { RawStep } from "../../../common/types/Step";
import { User } from "../../../common/types/User";

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

export interface CurrentUserState {
  user: User;
}

export interface CurrentStepState extends WithStatus {
  raw: RawStep | null;
}

export interface RootState {
  auth: AuthState;
  steps: StepsState;
  currentStep: CurrentStepState;
}
