<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Tag } from "../../../../common/types/Tag";
import { Dance, StepDifficulty } from "../../../../common/types/Step";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Input from "@/components/Forms/Input.vue";
import Select from "@/components/Forms/Select.vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import { DANCES, STEP_DIFFICULTIES } from "../../../../common/constants";
import PureButton from "@/components/PureButton/PureButton.vue";
import { pick, keys } from "lodash";
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

    @Emit("save-step")
    handleSubmit(): StepFormData {
        return pick(this, "name", "url", "difficulty", "tags", "dance");
    }

    url: string = "";
    name: string = "";
    difficulty: StepDifficulty = 1;
    tags: Tag[] = [];
    dance: Dance[] = [];

    get danceValues(): Dance[] {
        return keys(DANCES) as Dance[];
    }

    danceLabel(dance: Dance): string {
        return DANCES[dance];
    }

    get stepDifficulties() {
        return STEP_DIFFICULTIES;
    }

    reset(): void {
        this.url = "";
        this.name = "";
        this.difficulty = 1;
        this.tags = [];
        this.dance = [];
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit()">
        <main>
            <FormGroup label="Video url">
                <Input type="url" v-model="url" />
            </FormGroup>

            <FormGroup label="Name">
                <Input v-model="name" />
            </FormGroup>

            <section class="flex">
                <FormGroup class="w-1/2 pr-2" label="Difficulty">
                    <Select v-model.number="difficulty">
                        <option
                            v-for="(label, value) in stepDifficulties"
                            :value="value"
                            >{{ label }}</option
                        >
                    </Select>
                </FormGroup>
                <FormGroup class="w-1/2 pl-2" label="Dance">
                    <Checklist
                        v-model="dance"
                        :options="danceValues"
                        #default="{option}"
                    >
                        {{ danceLabel(option) }}
                    </Checklist>
                </FormGroup>
            </section>

            <FormGroup label="Tags">
                <TagsInput v-model="tags" :autocomplete="existingTags" />
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
