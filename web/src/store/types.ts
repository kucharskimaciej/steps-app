import { RawStep } from "../../../common/types/Step";
import { User } from "../../../common/types/User";

export interface AuthState {
  uid: string;
}

export interface StepsState {
  rawSteps: RawStep[];
  query: string;
}

export interface CurrentUserState {
  user: User;
}

export interface RootState {
  auth: AuthState;
  steps: StepsState;
  currentUser: CurrentUserState;
}
