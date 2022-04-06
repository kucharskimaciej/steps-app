<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import Select from "@/components/Forms/Select.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import Checklist from "@/components/Forms/Checklist.vue";
import Textarea from "@/components/Forms/Textarea.vue";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import type { StepDTO } from "../../../../common/types/Step";
import { Container } from "typedi";
import { SmartTags } from "../../../../common/lib/smartTags/smartTags.service";
import { TokenizeService } from "@/lib/tokenize.service";
import { StepFormData } from "@/features/CreateEditStep/StepForm/types";
import { KINDS } from "../../../../common/constants";
import { Feeling } from "../../../../common/types/Step";
import useVuelidate from "@vuelidate/core";
import { debounce, difference, head, uniq } from "lodash";
import { duplicate } from "@/lib/validators/duplicate";
import { oneOf } from "@/lib/validators/oneOf";
import { minLength, required } from "@vuelidate/validators";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { AppConfigToken } from "../../../../common/tokens";
import { Ref } from "@vue/reactivity";
import {
  DuplicateLocator,
  StepDuplicateLocator,
} from "@/lib/duplicateLocator.interface";

function getDataObject(step: Partial<StepDTO> = {}): StepFormData {
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
    tokens = [],
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
    tokens,
  };
}

const StepForm = defineComponent({
  components: {
    FormGroup,
    SimpleInput,
    Select,
    TagsInput,
    Checklist,
    Textarea,
    VideoInput,
  },
  props: {
    step: Object as PropType<StepDTO>,
    existingTags: Array as PropType<string[]>,
    existingArtists: Array as PropType<string[]>,
  },
  emits: ["input"],
  setup(props, ctx) {
    const duplicateLocator = Container.get<StepDuplicateLocator>(
      StepsDuplicateLocatorToken
    );
    const appConfig = Container.get(AppConfigToken);
    const smartTags = Container.get(SmartTags);
    const tokenizer = Container.get(TokenizeService);

    const state: Ref<StepFormData> = ref<StepFormData>(
      getDataObject(props.step)
    );
    const rules = {
      videos: {
        required,
        minLength: minLength(1),
        $each: {
          required,
          duplicate: duplicate(duplicateLocator, props.step && props.step.id),
        },
      },
      name: {
        required,
      },
      difficulty: {
        required,
        oneOf: oneOf(Object.keys(appConfig.difficulties).map(Number)),
      },
      kind: {
        required,
        oneOf: oneOf(Object.keys(KINDS)),
      },
      feeling: {
        required,
        minLength: minLength(1),
      },
      artists: {},
      tags: {
        minLength: minLength(1),
      },
      notes: {},
      smart_tags: {},
      removed_smart_tags: {},
      tokens: {},
    };

    const $v = useVuelidate(rules, state);

    watch(
      () => props.step,
      (newStep) => {
        if (newStep) {
          state.value = getDataObject(props.step);
        }
      }
    );

    watch(
      state,
      (value) => {
        ctx.emit("input", value);
      },
      { immediate: true, deep: true }
    );

    watch(
      () => $v.value.name.$model,
      debounce((name: string) => {
        state.value.smart_tags = difference(
          smartTags.getSmartTags(name),
          state.value.removed_smart_tags
        );

        state.value.tokens = tokenizer.tokenize(name);
      }, 200)
    );

    function feelingLabel(feeling: Feeling): string {
      return appConfig.feelings[feeling];
    }

    function handleSmartTagRemove(newValue: string[]) {
      const removedTag = head(difference(state.value.smart_tags, newValue));
      if (!removedTag) {
        return;
      }

      state.value.removed_smart_tags = uniq([
        ...state.value.removed_smart_tags,
        removedTag,
      ]);
    }

    function isDuplicateAt(index: number): boolean {
      return false;
      // return Boolean(
      //     this.form?.videos?.$each && this.form?.videos?.$each[index].$error
      // );
    }

    const duplicateSteps = computed(() => {
      return state.value.videos.reduce((acc, element, index) => {
        if (isDuplicateAt(index)) {
          const duplicateStep = duplicateLocator.getDuplicate(
            element,
            props.step?.id
          );
          if (duplicateStep) {
            acc[index] = duplicateStep;
          }
        }

        return acc;
      }, {} as Record<string, StepDTO>);
    });

    function validate() {}
    function reset(value?: StepFormData) {
      state.value = getDataObject(value);
    }

    return {
      stepKinds: KINDS,
      stepDifficulties: appConfig.difficulties,
      feelingValues: Object.keys(appConfig.feelings) as Feeling[],
      feelingLabel,
      handleSmartTagRemove,
      duplicateSteps,
      value: state,
      $v,
    };
  },
});

export default StepForm;
</script>

<template>
  <form novalidate @submit.prevent>
    <main>
      <FormGroup :validation="$v.videos" label="Videos">
        <VideoInput v-model="$v.videos.$model">
          <template
            v-for="(duplicateStep, index) in duplicateSteps"
            :slot="`helper-${index}`"
            :key="index"
          >
            <span class="text-red-lighter">
              Duplicate of {{ duplicateStep.name }}
            </span>
          </template>
        </VideoInput>
      </FormGroup>

      <FormGroup label="Name" :validation="$v.name">
        <SimpleInput v-model.lazy="$v.name.$model" />
      </FormGroup>

      <section class="flex">
        <div class="w-1/2 pr-3">
          <FormGroup label="Kind" :validation="$v.kind">
            <Select v-model.number="$v.kind.$model">
              <option
                v-for="(label, value) in stepKinds"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </Select>
          </FormGroup>

          <FormGroup label="Difficulty" :validation="$v.difficulty">
            <Select v-model.number="$v.difficulty.$model">
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
              v-model="$v.artists.$model"
              :autocomplete="existingArtists"
            />
          </FormGroup>
        </div>

        <FormGroup class="w-1/2 pl-3" label="Feeling" :validation="$v.feeling">
          <Checklist
            #default="{ option }"
            v-model="$v.feeling.$model"
            :options="feelingValues"
          >
            {{ feelingLabel(option) }}
          </Checklist>
        </FormGroup>
      </section>

      <FormGroup label="Tags" :validation="$v.tags">
        <TagsInput v-model="$v.tags.$model" :autocomplete="existingTags" />
      </FormGroup>

      <section class="flex">
        <FormGroup
          class="w-1/2 pr-3"
          label="Smart tags"
          :validation="$v.smart_tags"
        >
          <TagsInput
            :value="$v.smart_tags.$model"
            :allow-new="false"
            @input="handleSmartTagRemove($event)"
          />
        </FormGroup>
        <FormGroup
          class="w-1/2 pl-3"
          label="Removed smart tags"
          :validation="$v.removed_smart_tags"
        >
          <TagsInput :value="$v.removed_smart_tags.$model" :allow-new="false" />
        </FormGroup>
      </section>

      <FormGroup label="Notes" :validation="$v.notes">
        <Textarea v-model="$v.notes.$model" />
      </FormGroup>
    </main>
  </form>
</template>
