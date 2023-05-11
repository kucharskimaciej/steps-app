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
import {
  StepFormApi,
  StepFormData,
} from "@/features/CreateEditStep/StepForm/types";
import { KINDS } from "../../../../common/constants";
import { Feeling } from "../../../../common/types/Step";
import useVuelidate from "@vuelidate/core";
import { debounce, difference, head, uniq } from "lodash";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { AppConfigToken } from "../../../../common/tokens";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import {
  getDataObject,
  stepFormValidationRules,
} from "@/features/CreateEditStep/StepForm/formHelpers";

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

    const state = ref<StepFormData>(getDataObject(props.step));
    const rules = stepFormValidationRules(props.step);
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
        state.value = {
          ...state.value,
          smart_tags: difference(
            smartTags.getSmartTags(name),
            state.value.removed_smart_tags
          ),
          tokens: tokenizer.tokenize(name),
        };
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

      state.value = {
        ...state.value,
        removed_smart_tags: uniq([
          ...state.value.removed_smart_tags,
          removedTag,
        ]),
      };
    }

    function isDuplicateAt(index: number): boolean {
      console.log(
        JSON.stringify($v.value.videos?.$each.$response.$errors, null, 2)
      );

      return Boolean(
        $v.value.videos?.$each &&
          $v.value.videos?.$each.$response.$errors[index].duplicate?.length
      );
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

    function validate() {
      return $v.value.$validate();
    }
    function reset(value?: StepFormData) {
      state.value = getDataObject(value);
    }

    ctx.expose({
      value: state.value,
      reset,
      validate,
    } as StepFormApi);

    return {
      stepKinds: KINDS,
      stepDifficulties: appConfig.difficulties,
      feelingValues: Object.keys(appConfig.feelings) as Feeling[],
      feelingLabel,
      handleSmartTagRemove,
      duplicateSteps,
      value: state,
      form: $v,
    };
  },
});

export default StepForm;
</script>

<template>
  <form novalidate @submit.prevent>
    <main>
      <FormGroup :validation="form.videos" label="Videos">
        <VideoInput v-model="form.videos.$model">
          <template
            v-for="(duplicateStep, index) in duplicateSteps"
            v-slot:[`helper-${index}`]
            :key="index"
          >
            <span class="text-red-lighter">
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
            #default="{ option }"
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
            :model-value="form.smart_tags.$model"
            :allow-new="false"
            @update:model-value="handleSmartTagRemove($event)"
          />
        </FormGroup>
        <FormGroup
          class="w-1/2 pl-3"
          label="Removed smart tags"
          :validation="form.removed_smart_tags"
        >
          <TagsInput
            :model-value="form.removed_smart_tags.$model"
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
