import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import ValidationHint from "@/components/Forms/ValidationHint.vue";
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";
import FormGroup from "@/components/Forms/FormGroup.vue";
import SimpleInput from "@/components/Forms/SimpleInput.vue";

export default {
  title: "Components/ValidationHint",
  decorators: [Container("600px"), Spacing, NeutralBackground, WithGlobalStyles]
};

export const NoHint: () => Component = () => ({
  components: {
    ValidationHint
  },
  template: `<FormGroup>Should be empty <ValidationHint :validation="$v.name"/></FormGroup>`,
  methods: {},
  data: () => ({
    name: ""
  }),
  props: {},
  mixins: [validationMixin],
  validations: {
    name: {}
  }
});

export const ValidRequiredField: () => Component = () => ({
  components: {
    ValidationHint,
    FormGroup
  },
  template: `<FormGroup>Here's some content <ValidationHint :validation="$v.name"/></FormGroup>`,
  methods: {},
  data: () => ({
    name: "test"
  }),
  props: {},
  mixins: [validationMixin],
  validations: {
    name: {
      required
    }
  }
});

export const InvalidField: () => Component = () => ({
  components: {
    ValidationHint,
    FormGroup
  },
  template: `<FormGroup>Some content <ValidationHint :validation="$v.name"/></FormGroup>`,
  methods: {},
  data: () => ({
    name: "te"
  }),
  props: {},
  mixins: [validationMixin],
  validations: {
    name: {
      minLength: minLength(3)
    }
  },
  mounted(): void {
    (this as any).$v.name.$touch();
  }
});

export const InvalidRequiredField: () => Component = () => ({
  components: {
    ValidationHint,
    FormGroup
  },
  template: `<FormGroup>Some content <ValidationHint :validation="$v.name"/></FormGroup>`,
  methods: {},
  data: () => ({
    name: ""
  }),
  props: {},
  mixins: [validationMixin],
  validations: {
    name: {
      required
    }
  },
  mounted(): void {
    (this as any).$v.name.$touch();
  }
});

export const WithInput: () => Component = () => ({
  components: {
    ValidationHint,
    FormGroup,
    Input: SimpleInput
  },
  template: `
        <FormGroup label="Name" :validation="$v.name">
            <Input v-model="$v.name.$model"/>
        </FormGroup>
    `,
  methods: {},
  data: () => ({
    name: ""
  }),
  props: {},
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      minLength: minLength(3)
    }
  }
});
