<script lang="ts">
import { computed, defineComponent, PropType, reactive, watch } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Container } from "typedi";
import { debounce } from "lodash";

import FormGroup from "@/components/Forms/FormGroup.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import Select from "@/components/Forms/Select.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import Checklist from "@/components/Forms/Checklist.vue";
import Textarea from "@/components/Forms/Textarea.vue";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import type { StepDTO } from "../../../../common/types/Step";
import { TokenizeService } from "@/lib/tokenize.service";
import {
  StepFormApi,
  StepFormData,
} from "@/features/CreateEditStep/StepForm/types";
import { KINDS } from "../../../../common/constants";
import { Feeling } from "../../../../common/types/Step";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { AppConfigToken } from "../../../../common/tokens";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { getDataObject } from "@/features/CreateEditStep/StepForm/formHelpers";
import { useStepValidator } from "@/features/CreateEditStep/StepForm/useStepValidator";
import { useSmartTags } from "@/features/CreateEditStep/StepForm/useSmartTags";

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
    const tokenizer = Container.get(TokenizeService);

    const state = reactive<{ data: StepFormData }>({
      data: getDataObject(props.step),
    });

    const stepValidator = useStepValidator(props.step);
    const form = useForm<StepFormData>({
      initialValues: state.data,
      validationSchema: toTypedSchema(stepValidator),
    });

    const { updateSmartTags, handleSmartTagRemoved } = useSmartTags(form);

    watch(
      () => props.step,
      (newStep) => {
        if (newStep) {
          state.data = getDataObject(props.step);
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
      () => form.values.name,
      debounce((name: string) => {
        updateSmartTags();
        form.setFieldValue("tokens", tokenizer.tokenize(name));
      }, 200)
    );

    watch(() => form.values.removed_smart_tags, updateSmartTags, {
      deep: true,
    });

    const duplicateSteps = computed<Record<number, StepDTO>>(() => {
      const result = stepValidator.pick({ videos: true }).safeParse({
        videos: form.values.videos,
      });

      if (result.success) {
        return {};
      } else {
        return result.error.errors
          .filter((err) => (err as any).params?.duplicate)
          .reduce((acc, error) => {
            const [, idx] = error.path as [string, number];
            const video = form.values.videos[idx];

            const duplicateStep = duplicateLocator.getDuplicate(
              video,
              props.step?.id
            );

            if (duplicateStep) {
              acc[idx] = duplicateStep;
            }

            return acc;
          }, {} as Record<number, StepDTO>);
      }
    });

    function feelingLabel(feeling: Feeling): string {
      return appConfig.feelings[feeling];
    }

    async function validate() {
      const result = await form.validate();
      return result.valid;
    }
    function reset() {
      form.resetForm();
    }

    ctx.expose({
      getValue(): StepFormData {
        return form.values;
      },
      reset,
      validate,
    } as StepFormApi);

    return {
      stepKinds: KINDS,
      stepDifficulties: appConfig.difficulties,
      feelingValues: Object.keys(appConfig.feelings) as Feeling[],
      feelingLabel,
      handleSmartTagRemoved,
      duplicateSteps,
      value: state,
      form,
      name: form.defineComponentBinds("name"),
      kind: form.defineComponentBinds("kind"),
      difficulty: form.defineComponentBinds("difficulty"),
      artists: form.defineComponentBinds("artists"),
      feeling: form.defineComponentBinds("feeling"),
      tags: form.defineComponentBinds("tags"),
      smartTags: form.defineComponentBinds("smart_tags"),
      removedSmartTags: form.defineComponentBinds("removed_smart_tags"),
      notes: form.defineComponentBinds("notes"),
    };
  },
});

export default StepForm;
</script>

<template>
  <form novalidate @submit.prevent>
    <main>
      <FormGroup name="videos" label="Videos">
        <VideoInput>
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

      <FormGroup label="Name" name="name">
        <SimpleInput v-bind="name" />
      </FormGroup>

      <section class="flex">
        <div class="w-1/2 pr-3">
          <FormGroup label="Kind" name="kind">
            <Select v-bind="kind">
              <option
                v-for="(label, value) in stepKinds"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </Select>
          </FormGroup>

          <FormGroup label="Difficulty" name="difficulty">
            <Select
              v-bind="difficulty"
              @update:model-value="(v) => difficulty['onUpdate:modelValue'](+v)"
            >
              <option
                v-for="(label, value) in stepDifficulties"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </Select>
          </FormGroup>

          <FormGroup label="Artists" name="artists">
            <TagsInput v-bind="artists" :autocomplete="existingArtists" />
          </FormGroup>
        </div>

        <div class="w-1/2 pl-3">
          <FormGroup class="w-1/2 pl-3" label="Feeling" name="feeling">
            <Checklist
              #default="{ option }"
              v-bind="feeling"
              :options="feelingValues"
            >
              {{ feelingLabel(option) }}
            </Checklist>
          </FormGroup>
        </div>
      </section>

      <FormGroup label="Tags" name="tags">
        <TagsInput v-bind="tags" :autocomplete="existingTags" />
      </FormGroup>

      <section class="flex">
        <FormGroup class="w-1/2 pr-3" label="Smart tags" name="smart_tags">
          <TagsInput
            v-bind="smartTags"
            :allow-new="false"
            @update:model-value="handleSmartTagRemoved($event)"
          />
        </FormGroup>

        <FormGroup
          class="w-1/2 pl-3"
          label="Removed smart tags"
          name="removed_smart_tags"
        >
          <TagsInput v-bind="removedSmartTags" :allow-new="false" />
        </FormGroup>
      </section>

      <FormGroup label="Notes" name="notes">
        <Textarea v-bind="notes" />
      </FormGroup>
    </main>
  </form>
</template>
