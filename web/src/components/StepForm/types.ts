import { Dance, StepDifficulty } from "../../../../common/types/Step";
import { Tag } from "../../../../common/types/Tag";

export type StepFormData = {
    url: string;
    name: string;
    difficulty: StepDifficulty;
    tags: Tag[];
    dance: Dance[];
};

export interface StepFormApi {
    reset(): void;
}
