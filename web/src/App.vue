<template>
    <GlobalStyles>
        <router-view></router-view>
    </GlobalStyles>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import { getModule } from "vuex-module-decorators";
import { AuthModule } from "@/store/modules/auth";
import { Container } from "typedi";
import { FirebaseService } from "@/lib/firebase.service";
import { StepsModule } from "@/store/modules/steps";
import { CurrentUserModule } from "@/store/modules/currentUser";

@Component({
    components: {
        GlobalStyles
    }
})
export default class App extends Vue implements ComponentOptions<Vue> {
    private currentUser = getModule(CurrentUserModule, this.$store);
    private auth = getModule(AuthModule, this.$store);
    private steps = getModule(StepsModule, this.$store);
    private firebase = Container.get(FirebaseService);

    get uid() {
        return this.auth.uid;
    }

    public async mounted() {
        await this.firebase.setup();

        if (this.firebase.currentUser) {
            await this.auth.handleAuthStateChange(this.firebase.currentUser.uid);
        }

        this.firebase.onAuthStateChange(async user => {
            await this.auth.handleAuthStateChange(user ? user.uid : "");

            if (!user) {
                await this.firebase.authenticate();
            } else {
                await this.steps.fetchAllSteps();
            }
        });
    }
}
</script>
