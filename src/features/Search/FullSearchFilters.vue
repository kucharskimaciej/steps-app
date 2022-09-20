<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, watch } from "vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import { SearchFilters } from "@/features/Search/types";
import { AppConfigToken } from "../../../common/tokens";
import { Container } from "typedi";
import { entries } from "lodash";
import { OptionWithLabel } from "@/components/Forms/TagsSelection/types";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import TagsSelection from "@/components/Forms/TagsSelection/TagsSelection.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import useVuelidate from "@vuelidate/core";

const FullSearchFilters = defineComponent({
  validations() {
    return {
      filters: {
        query: {},
        feeling: {},
        includeAllTags: {},
        excludeAnyTags: {},
        anyArtists: {},
      },
    };
  },
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
    const v$ = useVuelidate();

    watch(
      () => props.filters,
      (filters: SearchFilters) => ctx.emit("input", filters),
      { deep: true }
    );

    const appConfig = Container.get(AppConfigToken);
    const feelingOptions: ComputedRef<OptionWithLabel[]> = computed(() =>
      entries(appConfig.feelings).map(([key, label]) => ({
        key,
        label,
      }))
    );

    return {
      v$,
      feelingOptions,
    };
  },
});

export default FullSearchFilters;
</script>

<template>
  <section>
    <FormGroup :validation="v$.filters.query">
      <SimpleInput
        v-model.trim="v$.filters.query.$model"
        lazy
        placeholder="Search"
      />
    </FormGroup>

    <FormGroup label="Feeling" :validation="v$.filters.feeling">
      <TagsSelection
        v-model="v$.filters.feeling.$model"
        :options="feelingOptions"
      />
    </FormGroup>

    <FormGroup label="Only include matching all tags">
      <TagsInput
        v-model="v$.filters.includeAllTags.$model"
        :autocomplete="existingTags"
        :allow-new="false"
      />
    </FormGroup>

    <FormGroup label="Exclude matching any tags">
      <TagsInput
        v-model="v$.filters.excludeAnyTags.$model"
        :autocomplete="existingTags"
        :allow-new="false"
      />
    </FormGroup>

    <FormGroup label="Artists">
      <TagsInput
        v-model="v$.filters.anyArtists.$model"
        :autocomplete="existingArtists"
        :allow-new="false"
      />
    </FormGroup>
  </section>
</template>
