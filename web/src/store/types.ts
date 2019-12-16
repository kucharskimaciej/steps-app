import { Step } from "../../../types/Step";

export interface AuthState {
    uid: string;
}

export interface StepsState {
    steps: Step[];
    query: string;
}

export interface RootState {
    auth: AuthState;
}
