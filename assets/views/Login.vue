<template>
    <div class="login-container">

            <form class="login-form" v-if="!isLoading" @keyup.enter="login()">
        
                <div class="login-title" @click="toggleMode()">
                    <img :src="require('@/statics/images/logo-text-cwebsolution.svg')" alt="Logo CWebSolution">
                </div>

                <input type="text" name="login-form-email" class="form-input" placeholder="Email" v-model="loginForm.username">

                <div class="form-input-password">
                    <input type="password" name="login-form-password" class="form-input" id="form-input-password" placeholder="Mot de passe" v-model="loginForm.password">
                    <span class="password-icon"><i class="fas fa-eye visible" id="visible-icon" @click="togglePasswordVisibility()"></i></span>  
                </div>

                <input type="button" class="btn btn-primary" value="Connexion" @click="login()">

                <p class="form-error-message" v-if="error">{{ error }}</p>

            </form>

            <loader-component v-if="isLoading"></loader-component>

        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LoginFormDto } from '@/core/dtos/login-form-dto';
import { authService } from '@/core/services/auth/auth-service';
import LoaderComponent from '@/components/commons/LoaderComponent.vue';

export default defineComponent({
    name: 'Login',
    components: {LoaderComponent},
    data() {
        return {
            loginForm: { username: '', password: '' } as LoginFormDto,
            error: null as string,
            passwordVisibility: false,
            isLoading: false
        }
    },
    methods: {
        async login(): Promise<void> {  
            this.isLoading = true;
            this.error = null;
            authService.login(this.loginForm).then((response: void|string) => {
                if (typeof response === 'string') {
                    this.isLoading = false;
                    this.error = response;
                }
            });
        },

        togglePasswordVisibility() {
            const input = document.getElementById('form-input-password');
            const icon = document.getElementById('visible-icon');

            if (!this.passwordVisibility) {
                input.setAttribute('type', 'text');
                icon.className = 'fas fa-eye-slash hidden';
                this.passwordVisibility = true;
            } else {
                input.setAttribute('type', 'password');
                icon.className = 'fas fa-eye visible';
                this.passwordVisibility = false;
            }
        },

        toggleMode() {
            const root = document.documentElement;
            if (root.getAttribute('data-theme') === 'dark') {
                root.removeAttribute('data-theme');
            } else {
                root.setAttribute('data-theme', 'dark');
            }
        }
    }
});
</script>

<style lang="scss" scoped>
    .login-container {
        width: 100%;
        max-width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        @include center;

        .login-form {
            width: 100%;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            padding: 40px;
            border-radius: 2px;
            box-shadow: $box-shadow;

            .login-title {
                display: flex;
                align-items: center;
                margin-bottom: 30px;

                img {
                    width: 50%;
                    margin-right: 6px;
                }
            }

            input[type=text],
            input[type=password] {
                width: 100%;
                margin-bottom: 15px;
            }

            input[type=button] { margin-top: 20px; transition: all .5s; &:hover { opacity: .95; } }

            .form-input-password {
                display: flex;
                position: relative;

                .password-icon { color: var(--c-tertiary); transition: all .5s; &:hover { opacity: .85; } }

                i {
                    position: absolute;
                    right: 2%;
                    top: 28%;
                    cursor: pointer;
                }
            }
        }
    }
</style>
