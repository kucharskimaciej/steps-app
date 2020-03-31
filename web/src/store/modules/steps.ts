import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { StepsState } from "@/store/types";
import { RawStep, Step } from "../../../../common/types/Step";
import { Container } from "vue-typedi";
import {
  CreateParams,
  StepsResource,
  UpdateParams
} from "@/lib/steps.resource";
import { Tag, TagTypes } from "../../../../common/types/Tag";
import { orderBy, uniq, maxBy } from "lodash";
import { DANCES, STEP_DIFFICULTIES } from "../../../../common/constants";

const stepsResource = Container.get(StepsResource);
@Module({ name: "steps", namespaced: true })
export class StepsModule extends VuexModule implements StepsState {
  public rawSteps: RawStep[] = [];
  public query = "";

  @Mutation
  private SET_STEPS(steps: RawStep[]) {
    this.rawSteps = steps;
  }

  @Mutation
  private ADD_STEP(step: RawStep) {
    this.rawSteps = [...this.rawSteps, step];
  }

  @Mutation
  private UPDATE_STEP(updatedStep: RawStep) {
    this.rawSteps = this.rawSteps.map(step =>
      step.id === updatedStep.id ? updatedStep : step
    );
  }

  @Action({ commit: "SET_STEPS" })
  public async fetchAllSteps() {
    return stepsResource.query(this.context.rootState.auth.uid);
  }

  @Action({ commit: "ADD_STEP" })
  public async createStep(params: CreateParams) {
    return stepsResource.create(params);
  }

  @Action({ commit: "UPDATE_STEP" })
  public async updateStep([stepId, params]: [string, UpdateParams]) {
    return stepsResource.update(stepId, params);
  }

  get steps() {
    const unorderedSteps: Step[] = this.rawSteps.map(
      ({
        identifier,
        id,
        tags,
        dance,
        difficulty,
        owner_uid,
        created_at,
        name,
        url,
        artists,
        notes
      }) => {
        const generatedTags: Tag[] = [
          ...tags.map(tag => ({
            text: tag
          })),
          ...dance.map(d => ({
            type: TagTypes.DANCE,
            text: DANCES[d]
          })),
          {
            type: TagTypes.DIFFICULTY,
            text: STEP_DIFFICULTIES[difficulty]
          },
          ...artists.map(artist => ({
            type: TagTypes.ARTIST,
            text: artist
          }))
        ];

        return {
          identifier,
          id,
          tags: generatedTags,
          url,
          name,
          notes,
          created_at,
          owner_uid
        };
      }
    );

    return orderBy(
      unorderedSteps,
      [
        step =>
          step.id in this.context.rootGetters["currentUser/practiceSteps"],
        "created_at"
      ],
      ["desc", "desc"]
    );
  }

  get nextIdentifier() {
    const step = maxBy(this.rawSteps, "identifier");
    return step ? step.identifier + 1 : 1;
  }

  get existingTags() {
    return uniq(this.rawSteps.map(step => step.tags).flat());
  }

  get existingArtists() {
    return uniq(this.rawSteps.map(step => step.artists).flat());
  }
}
