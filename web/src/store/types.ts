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
  getters: {
    practiceSteps: Record<string, boolean>;
  };
}

export interface RootState {
  auth: AuthState;
  steps: StepsState;
  currentUser: CurrentUserState;
}
