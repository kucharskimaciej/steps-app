<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Tag, TagTypes } from "../../../../common/types/Tag";
import { Dance, RawStep } from "../../../../common/types/Step";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Input from "@/components/Forms/Input.vue";
import Select from "@/components/Forms/Select.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import { DANCES, STEP_DIFFICULTIES } from "../../../../common/constants";
import PureButton from "@/components/PureButton/PureButton.vue";
import Checklist from "@/components/Forms/Checklist.vue";
import { StepFormApi, StepFormData } from "@/components/StepForm/types";
import { validationMixin } from "vuelidate";
import {
  minLength,
  required,
  url as urlValidator
} from "vuelidate/lib/validators";
import { oneOf } from "@/lib/validators/oneOf";
import { duplicate } from "@/lib/validators/duplicate";
import { Inject } from "vue-typedi";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";
import Textarea from "@/components/Forms/Textarea.vue";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { SmartTags } from "@/lib/smartTags.service";
import { DebounceTime } from "@/lib/decorators/debouceTime";
import { uniq, head, difference } from "lodash";

@Component({
  components: {
    FormGroup,
    Input,
    Select,
    TagsInput,
    PureButton,
    Checklist,
    Textarea
  },
  mixins: [validationMixin],
  validations(this: StepForm) {
    return {
      formData: {
        url: {
          required,
          url: urlValidator,
          duplicate: duplicate(this.duplicateLocator, this.step && this.step.id)
        },
        name: {
          required
        },
        difficulty: {
          required,
          oneOf: oneOf(Object.keys(STEP_DIFFICULTIES).map(Number))
        },
        dance: {
          required,
          minLength: minLength(1)
        },
        artists: {},
        tags: {
          required,
          minLength: minLength(1)
        },
        notes: {},
        smart_tags: {},
        removed_smart_tags: {}
      }
    };
  }
})
export default class StepForm extends Vue implements StepFormApi {
  @Prop({ default: () => [] }) private existingTags!: Tag[];
  @Prop({ default: () => [] }) private existingArtists!: string[];
  @Prop() private step!: RawStep;

  @Inject(StepsByUrlDuplicateLocatorToken)
  private readonly duplicateLocator!: DuplicateLocator<RawStep, string>;

  @Inject()
  private readonly smartTags!: SmartTags;

  handleSubmit() {
    this.$v.$touch();

    if (!this.$v.$invalid) {
      this.$emit("save-step", this.formData);
    }
  }

  formData: StepFormData = this.getDataObject(this.step);

  @Watch("step")
  handleStepChange(step: RawStep) {
    this.formData = this.getDataObject(step);
  }

  @Watch("form.name.$model")
  @DebounceTime(200)
  handleNameChange(name: string) {
    this.formData.smart_tags = difference(
      this.smartTags.getSmartTags(name),
      this.formData.removed_smart_tags
    );
  }

  get danceValues(): Dance[] {
    return Object.keys(DANCES) as Dance[];
  }

  danceLabel(dance: Dance): string {
    return DANCES[dance];
  }

  get stepDifficulties() {
    return STEP_DIFFICULTIES;
  }

  reset(): void {
    this.formData = this.getDataObject();
  }

  private getDataObject(step: Partial<RawStep> = {}): StepFormData {
    const {
      url = "",
      name = "",
      difficulty = 1,
      dance = [],
      tags = [],
      artists = [],
      notes = "",
      smart_tags = [],
      removed_smart_tags = []
    } = step;

    return {
      url,
      name,
      difficulty,
      dance,
      tags,
      artists,
      notes,
      smart_tags,
      removed_smart_tags
    };
  }

  get form() {
    return this.$v.formData!;
  }

  get duplicateStep() {
    return this.duplicateLocator.getDuplicate(
      this.formData.url,
      this.step && this.step.id
    );
  }

  get artistTagType() {
    return TagTypes.ARTIST;
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
}
</script>

<template>
  <form novalidate @submit.prevent="handleSubmit()">
    <main>
      <FormGroup label="Video url" :validation="form.url">
        <Input v-model.trim.lazy="form.url.$model" type="url" />
        <template v-if="duplicateStep" #help>
          <strong>Duplicate of</strong> {{ duplicateStep.name }}
        </template>
      </FormGroup>

      <FormGroup label="Name" :validation="form.name">
        <Input v-model.trim.lazy="form.name.$model" />
      </FormGroup>

      <section class="flex">
        <div class="w-1/2 pr-3">
          <FormGroup label="Difficulty" :validation="form.difficulty">
            <Select v-model.number="form.difficulty.$model">
              <option
                v-for="(label, value) in stepDifficulties"
                :key="value"
                :value="value"
                >{{ label }}</option
              >
            </Select>
          </FormGroup>
          <FormGroup label="Artists">
            <TagsInput
              v-model="form.artists.$model"
              :autocomplete="existingArtists"
              :tag-type="artistTagType"
            />
          </FormGroup>
        </div>

        <FormGroup class="w-1/2 pl-3" label="Dance" :validation="form.dance">
          <Checklist
            #default="{option}"
            v-model="form.dance.$model"
            :options="danceValues"
          >
            {{ danceLabel(option) }}
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
            @input="handleSmartTagRemove($event)"
            :allow-new="false"
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
    <footer class="mt-8 text-right">
      <PureButton type="submit" kind="success" spacing="wide" size="large">
        Save
      </PureButton>
    </footer>
  </form>
</template>
