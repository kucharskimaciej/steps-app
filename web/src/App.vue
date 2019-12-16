<template>
    <div>{{ loginStatus }} {{ uid }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ComponentOptions } from "vue";
import GlobalStyles from "@/components/GlobalStyles.vue";
import { getModule } from "vuex-module-decorators";
import { AuthModule } from "@/store/modules/auth";
import { Container } from "typedi";
import { FirebaseService } from "@/lib/firebase.service";

@Component({
    components: {
        GlobalStyles
    }
})
export default class App extends Vue implements ComponentOptions<Vue> {
    private auth = getModule(AuthModule, this.$store);
    private firebase = Container.get(FirebaseService);

    get loginStatus() {
        return this.auth.status;
    }

    get uid() {
        return this.auth.uid;
    }

    public async mounted() {
        await this.firebase.setup();

        if (this.firebase.currentUser) {
            this.auth.handleAuthStateChange(this.firebase.currentUser.uid);
        }

        this.firebase.onAuthStateChange(async user => {
            this.auth.handleAuthStateChange(user ? user.uid : "");

            if (!user) {
                await this.firebase.authenticate();
            }
        });
    }
}
</script>
