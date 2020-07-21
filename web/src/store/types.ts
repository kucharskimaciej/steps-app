import { RawStep } from "../../../common/types/Step";
import { User } from "../../../common/types/User";

export type Status = "clean" | "pending" | "dirty";

export interface AuthState {
  uid: string;
}

export interface StepsState {
  rawSteps: RawStep[];
  status: Status;
}

export interface CurrentUserState {
  user: User;
}

export interface RootState {
  auth: AuthState;
  steps: StepsState;
  currentUser: CurrentUserState;
}
