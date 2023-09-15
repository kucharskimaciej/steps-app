<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  reactive,
  watch,
} from "vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import { SearchFilters } from "@/features/Search/types";
import { AppConfigToken } from "../../../common/tokens";
import { Container } from "typedi";
import { debounce, entries } from "lodash";
import { OptionWithLabel } from "@/components/Forms/TagsSelection/types";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import TagsSelection from "@/components/Forms/TagsSelection/TagsSelection.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import { useForm } from "vee-validate";

const FullSearchFilters = defineComponent({
  components: {
    TagsInput,
    TagsSelection,
    FormGroup,
    SimpleInput,
  },
  props: {
    filters: {
      type: Object as PropType<SearchFilters>,
      default: () => ({
        query: "",
        feeling: [],
        includeAllTags: [],
        excludeAnyTags: [],
        anyArtists: [],
      }),
    },
    existingTags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    existingArtists: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["input"],
  setup(props, ctx) {
    const state = reactive<{ data: SearchFilters }>({
      data: props.filters,
    });

    const form = useForm<SearchFilters>({
      initialValues: state.data,
    });

    const appConfig = Container.get(AppConfigToken);
    const feelingOptions: ComputedRef<OptionWithLabel[]> = computed(() =>
      entries(appConfig.feelings).map(([key, label]) => ({
        key,
        label,
      }))
    );

    watch(
      form.values,
      debounce((value) => {
        ctx.emit("input", value);
      }, 50),
      { immediate: true, deep: true }
    );

    return {
      form,
      query: form.defineComponentBinds("query"),
      feeling: form.defineComponentBinds("feeling"),
      includeAllTags: form.defineComponentBinds("includeAllTags"),
      excludeAnyTags: form.defineComponentBinds("excludeAnyTags"),
      anyArtists: form.defineComponentBinds("anyArtists"),
      feelingOptions,
    };
  },
});

export default FullSearchFilters;
</script>

<template>
  <section>
    <FormGroup name="query">
      <SimpleInput v-bind="query" lazy placeholder="Search" />
    </FormGroup>

    <FormGroup label="Feeling" name="feeling">
      <TagsSelection v-bind="feeling" :options="feelingOptions" />
    </FormGroup>

    <FormGroup name="includeAllTags" label="Only include matching all tags">
      <TagsInput
        v-bind="includeAllTags"
        :autocomplete="existingTags"
        :allow-new="false"
      />
    </FormGroup>

    <FormGroup name="excludeAnyTags" label="Exclude matching any tags">
      <TagsInput
        v-bind="excludeAnyTags"
        :autocomplete="existingTags"
        :allow-new="false"
      />
    </FormGroup>

    <FormGroup name="artists" label="Artists">
      <TagsInput
        v-bind="anyArtists"
        :autocomplete="existingArtists"
        :allow-new="false"
      />
    </FormGroup>
  </section>
</template>
