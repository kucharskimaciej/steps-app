<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { entries } from "lodash";
import { Inject } from "vue-typedi";
import { validationMixin } from "vuelidate";
import FormGroup from "@/components/Forms/FormGroup.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import { OptionWithLabel } from "@/components/Forms/TagsSelection/types";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import TagsSelection from "@/components/Forms/TagsSelection/TagsSelection.vue";
import { SearchFilters } from "@/features/Search/types";
import { AppConfigToken } from "../../../common/tokens";
import { AppConfig } from "../../../common/config/types";

@Component({
  components: {
    TagsInput,
    TagsSelection,
    FormGroup,
    SimpleInput
  },
  mixins: [validationMixin],
  validations(this: FullSearchFilters) {
    return {
      filters: {
        query: {},
        feeling: {},
        includeAllTags: {},
        excludeAnyTags: {},
        anyArtists: {}
      }
    };
  }
})
export default class FullSearchFilters extends Vue {
  @Inject(AppConfigToken)
  private readonly appConfig!: AppConfig;

  @Prop({
    default: () => ({
      query: "",
      feeling: [],
      includeAllTags: [],
      excludeAnyTags: [],
      anyArtists: []
    })
  })
  private filters!: SearchFilters;

  @Prop({ default: () => [] }) private existingTags!: string[];
  @Prop({ default: () => [] }) private existingArtists!: string[];

  get feelingOptions(): OptionWithLabel[] {
    return entries(this.appConfig.feelings).map(([key, label]) => ({
      key,
      label
    }));
  }

  @Watch("filters", { deep: true })
  handleSearchChange(newSearch: SearchFilters) {
    this.$emit("input", newSearch);
  }
}
</script>

<template>
  <section>
    <FormGroup :validation="$v.filters.query">
      <SimpleInput
        v-model.trim="$v.filters.query.$model"
        lazy
        placeholder="Search"
      />
    </FormGroup>

    <FormGroup label="Feeling" :validation="$v.filters.feeling">
      <TagsSelection
        v-model="$v.filters.feeling.$model"
        :options="feelingOptions"
      />
    </FormGroup>

    <FormGroup label="Only include matching all tags">
      <TagsInput
        v-model="$v.filters.includeAllTags.$model"
        :autocomplete="existingTags"
        :allow-new="false"
      />
    </FormGroup>

    <FormGroup label="Exclude matching any tags">
      <TagsInput
        v-model="$v.filters.excludeAnyTags.$model"
        :autocomplete="existingTags"
        :allow-new="false"
      />
    </FormGroup>

    <FormGroup label="Artists">
      <TagsInput
        v-model="$v.filters.anyArtists.$model"
        :autocomplete="existingArtists"
        :allow-new="false"
      />
    </FormGroup>
  </section>
</template>
