<script lang="ts">
    import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import { Tag } from "../../../../common/types/Tag";
import { Dance, RawStep, Step } from "../../../../common/types/Step";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Input from "@/components/Forms/Input.vue";
import Select from "@/components/Forms/Select.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import { DANCES, STEP_DIFFICULTIES } from "../../../../common/constants";
import PureButton from "@/components/PureButton/PureButton.vue";
import Checklist from "@/components/Forms/Checklist.vue";
import { StepFormApi, StepFormData } from "@/components/StepForm/types";

@Component({
    components: {
        FormGroup,
        Input,
        Select,
        TagsInput,
        PureButton,
        Checklist
    }
})
export default class StepForm extends Vue implements StepFormApi {
    @Prop({ default: () => [] }) private existingTags!: Tag[];
    @Prop() private step!: RawStep;

    @Emit("save-step")
    handleSubmit(): StepFormData {
        return this.data;
    }

    data: StepFormData = this.getDataObject(this.step);

    @Watch('step')
    handleStepChange(step: RawStep) {
        this.data = this.getDataObject(step);
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
        this.data = this.getDataObject();
    }

    private getDataObject(step: Partial<RawStep> = {}): StepFormData {
        const {
            url = "",
            name = "",
            difficulty = 1,
            dance = [],
            tags = []
        } = step;

        return {
            url,
            name,
            difficulty,
            dance,
            tags
        };
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit()">
        <main>
            <FormGroup label="Video url">
                <Input type="url" v-model="data.url" />
            </FormGroup>

            <FormGroup label="Name">
                <Input v-model="data.name" />
            </FormGroup>

            <section class="flex">
                <FormGroup class="w-1/2 pr-2" label="Difficulty">
                    <Select v-model.number="data.difficulty">
                        <option
                            v-for="(label, value) in stepDifficulties"
                            :value="value"
                            >{{ label }}</option
                        >
                    </Select>
                </FormGroup>
                <FormGroup class="w-1/2 pl-2" label="Dance">
                    <Checklist
                        v-model="data.dance"
                        :options="danceValues"
                        #default="{option}"
                    >
                        {{ danceLabel(option) }}
                    </Checklist>
                </FormGroup>
            </section>

            <FormGroup label="Tags">
                <TagsInput v-model="data.tags" :autocomplete="existingTags" />
            </FormGroup>
        </main>
        <footer class="mt-8 text-right">
            <PureButton
                type="submit"
                kind="success"
                spacing="wide"
                size="large"
            >
                Save
            </PureButton>
        </footer>
    </form>
</template>
