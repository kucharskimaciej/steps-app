import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import { withKnobs } from "@storybook/addon-knobs";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import { minLength, required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { duplicate } from "@/lib/validators/duplicate";
import { AlwaysDuplicate } from "@/stories/mocks/mockStepDuplicateLocator.service";

export default {
  title: "Components/VideoInput",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    NeutralBackground,
    WithGlobalStyles
  ]
};

export const Default = () => ({
  components: {
    VideoInput,
    FormGroup
  },
  template: `
    <div>
    <FormGroup>
        <VideoInput v-model="videos" />
    </FormGroup>
    <pre>{{ videos }}</pre>
    </div>
  `,
  data: () => ({
    videos: []
  })
});

export const WithValidation = () => {
  return {
    components: {
      VideoInput,
      FormGroup
    },
    template: `
    <div>
    <FormGroup :validation="$v.videos" label="Videos">
        <VideoInput v-model="$v.videos.$model" />
    </FormGroup>
    <pre>{{ $v.videos }}</pre>
    </div>
  `,
    data: () => ({
      videos: []
    }),
    mixins: [validationMixin],
    validations: () => ({
      videos: {
        required,
        minLength: minLength(2)
      }
    })
  };
};

export const DuplicateValidation = () => {
  const duplicateLocator = new AlwaysDuplicate();

  return {
    components: {
      VideoInput,
      FormGroup
    },
    template: `
    <div>
    <FormGroup :validation="$v.videos" label="Videos">
        <VideoInput v-model="$v.videos.$model">
            <template v-for="(_, index) in videos"
                    v-if="$v.videos.$each[index].$error"
                    :slot="['helper', index].join('-')"
                    class="text-red-lighter">
                Invalid
            </template>
        </VideoInput>
    </FormGroup>
    <pre>{{ $v.videos }}</pre>
    </div>
  `,
    data: () => ({
      videos: []
    }),
    mixins: [validationMixin],
    validations: () => ({
      videos: {
        required,
        minLength: minLength(1),
        $each: {
          duplicate: duplicate(duplicateLocator)
        }
      }
    })
  };
};
