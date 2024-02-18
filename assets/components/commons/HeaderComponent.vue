<template>
    <header>
        <div class="navbar">
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{ name: 'page' }">Page</router-link>
        </div>
        <div class="navbar-right">
            <div v-if="curentUser">
                <p>{{ curentUser.firstName + ' ' + curentUser.lastName.toUpperCase() }}</p>
                <p>{{ frenchStringify(curentUser.roles[0]) }}</p>
                <p>{{ curentUser.email }}</p>
            </div>
            <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue';
import { authService } from '@/core/services/auth/auth-service';
import { User } from '@/core/models/user';
import HelperRolesEnum from '@/core/helpers/helper-roles-enum';
import { RolesEnum } from '@/core/enums/roles-enum';

export default defineComponent({
    name: 'HeaderComponent',
    data() {
        return {
            curentUser: null as User
        }
    },
    methods: {
        frenchStringify(role: RolesEnum) {
            return HelperRolesEnum.frenchStringify(role);
        },
        logout() {
            authService.logout();
        }
    },
    async mounted() {
        if (!this.$store.getters.getCurrentUser) {
            this.curentUser = await authService.getCurrentUser();
        } else {
            this. curentUser = this.$store.getters.getCurrentUser;
        }
    },
})
</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 15px 20px;

        .navbar {
            
            a {
                color: var(--c-text);
                padding: 10px 20px;

                &:hover { opacity: .8; }
            }
        }

        .navbar-right {
            display: flex;
            color: var(--c-text); 

            button { margin-left: 20px; &:hover { opacity: .8; } }
        }
    }
</style>
