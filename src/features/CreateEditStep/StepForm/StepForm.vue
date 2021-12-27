<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Feeling, RawStep } from "../../../../common/types/Step";
import FormGroup from "@/components/Forms/FormGroup.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import Select from "@/components/Forms/Select.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import { KINDS } from "../../../../common/constants";
import Checklist from "@/components/Forms/Checklist.vue";
import {
  StepFormApi,
  StepFormData
} from "@/features/CreateEditStep/StepForm/types";
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import { oneOf } from "@/lib/validators/oneOf";
import { duplicate } from "@/lib/validators/duplicate";
import { Inject } from "vue-typedi";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import Textarea from "@/components/Forms/Textarea.vue";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { SmartTags } from "../../../../common/lib/smartTags/smartTags.service";
import { DebounceTime } from "@/lib/decorators/debouceTime";
import { uniq, head, difference } from "lodash";
import { TokenizeService } from "@/lib/tokenize.service";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import { AppConfigToken } from "../../../../common/tokens";
import { AppConfig } from "../../../../common/config/types";

@Component({
  components: {
    FormGroup,
    SimpleInput,
    Select,
    TagsInput,
    Checklist,
    Textarea,
    VideoInput
  },
  mixins: [validationMixin],
  validations(this: StepForm) {
    return {
      formData: {
        videos: {
          required,
          minLength: minLength(1),
          $each: {
            required,
            duplicate: duplicate(
              this.duplicateLocator,
              this.step && this.step.id
            )
          }
        },
        name: {
          required
        },
        difficulty: {
          required,
          oneOf: oneOf(Object.keys(this.appConfig.difficulties).map(Number))
        },
        kind: {
          required,
          oneOf: oneOf(Object.keys(KINDS))
        },
        feeling: {
          required,
          minLength: minLength(1)
        },
        artists: {},
        tags: {
          minLength: minLength(1)
        },
        notes: {},
        smart_tags: {},
        removed_smart_tags: {},
        tokens: {}
      }
    };
  }
})
export default class StepForm extends Vue implements StepFormApi {
  @Prop({ default: () => [] }) private existingTags!: string[];
  @Prop({ default: () => [] }) private existingArtists!: string[];
  @Prop() private step!: RawStep;

  @Inject(StepsDuplicateLocatorToken)
  private readonly duplicateLocator!: StepDuplicateLocator;

  @Inject(AppConfigToken)
  private readonly appConfig!: AppConfig;

  @Inject()
  private readonly smartTags!: SmartTags;

  @Inject() private readonly tokenizer!: TokenizeService;

  get value() {
    return this.formData;
  }

  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  reset(value?: StepFormData): void {
    this.formData = this.getDataObject(value);
  }

  formData: StepFormData = this.getDataObject(this.step);

  @Watch("step", { immediate: true })
  handleStepChange(step: RawStep) {
    if (step) {
      this.formData = this.getDataObject(step);
    }
  }

  @Watch("form.name.$model")
  @DebounceTime(200)
  handleNameChange(name: string) {
    this.formData.smart_tags = difference(
      this.smartTags.getSmartTags(name),
      this.formData.removed_smart_tags
    );

    this.formData.tokens = this.tokenizer.tokenize(name);
  }

  get feelingValues(): Feeling[] {
    return Object.keys(this.appConfig.feelings) as Feeling[];
  }

  feelingLabel(feeling: Feeling): string {
    return this.appConfig.feelings[feeling];
  }

  get stepDifficulties() {
    return this.appConfig.difficulties;
  }

  get stepKinds() {
    return KINDS;
  }

  private getDataObject(step: Partial<RawStep> = {}): StepFormData {
    const {
      videos = [],
      name = "",
      difficulty = 1,
      feeling = [],
      kind = "step",
      tags = [],
      artists = [],
      notes = "",
      smart_tags = [],
      removed_smart_tags = [],
      tokens = []
    } = step;

    return {
      videos,
      name,
      difficulty,
      feeling,
      kind,
      tags,
      artists,
      notes,
      smart_tags,
      removed_smart_tags,
      tokens
    };
  }

  get form() {
    return this.$v.formData;
  }

  handleSmartTagRemove(newValue: string[]) {
    const removedTag = head(difference(this.formData.smart_tags, newValue));
    if (!removedTag) {
      return;
    }

    this.formData.removed_smart_tags = uniq([
      ...this.formData.removed_smart_tags,
      removedTag
    ]);
  }

  private isDuplicateAt(index: number): boolean {
    return Boolean(
      this.form?.videos?.$each && this.form?.videos?.$each[index].$error
    );
  }

  get duplicateSteps(): Record<string, RawStep> {
    return this.value.videos.reduce((acc, element, index) => {
      if (this.isDuplicateAt(index)) {
        const duplicateStep = this.duplicateLocator.getDuplicate(
          element,
          this.step?.id
        );
        if (duplicateStep) {
          acc[index] = duplicateStep;
        }
      }

      return acc;
    }, {} as Record<string, RawStep>);
  }
}
</script>

<template>
  <form novalidate @submit.prevent>
    <main>
      <FormGroup :validation="form.videos" label="Videos">
        <VideoInput v-model="form.videos.$model">
          <template
            v-for="(duplicateStep, index) in duplicateSteps"
            :slot="`helper-${index}`"
            class="text-red-lighter"
          >
            <span :key="index" class="text-sm">
              Duplicate of {{ duplicateStep.name }}
            </span>
          </template>
        </VideoInput>
      </FormGroup>

      <FormGroup label="Name" :validation="form.name">
        <SimpleInput v-model.lazy="form.name.$model" />
      </FormGroup>

      <section class="flex">
        <div class="w-1/2 pr-3">
          <FormGroup label="Kind" :validation="form.kind">
            <Select v-model.number="form.kind.$model">
              <option
                v-for="(label, value) in stepKinds"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </Select>
          </FormGroup>

          <FormGroup label="Difficulty" :validation="form.difficulty">
            <Select v-model.number="form.difficulty.$model">
              <option
                v-for="(label, value) in stepDifficulties"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </Select>
          </FormGroup>
          <FormGroup label="Artists">
            <TagsInput
              v-model="form.artists.$model"
              :autocomplete="existingArtists"
            />
          </FormGroup>
        </div>

        <FormGroup
          class="w-1/2 pl-3"
          label="Feeling"
          :validation="form.feeling"
        >
          <Checklist
            #default="{option}"
            v-model="form.feeling.$model"
            :options="feelingValues"
          >
            {{ feelingLabel(option) }}
          </Checklist>
        </FormGroup>
      </section>

      <FormGroup label="Tags" :validation="form.tags">
        <TagsInput v-model="form.tags.$model" :autocomplete="existingTags" />
      </FormGroup>

      <section class="flex">
        <FormGroup
          class="w-1/2 pr-3"
          label="Smart tags"
          :validation="form.smart_tags"
        >
          <TagsInput
            :value="form.smart_tags.$model"
            :allow-new="false"
            @input="handleSmartTagRemove($event)"
          />
        </FormGroup>
        <FormGroup
          class="w-1/2 pl-3"
          label="Removed smart tags"
          :validation="form.removed_smart_tags"
        >
          <TagsInput
            :value="form.removed_smart_tags.$model"
            :allow-new="false"
          />
        </FormGroup>
      </section>

      <FormGroup label="Notes" :validation="form.notes">
        <Textarea v-model="form.notes.$model" />
      </FormGroup>
    </main>
  </form>
</template>
