<template>
    <header-component></header-component>

    <div class="container">
        <div class="not-found">
            <p>Oups, désolé, il semblerait que cette page n'existe pas...</p>
        </div>
    </div>

    <footer-component></footer-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/commons/HeaderComponent.vue';
import FooterComponent from '@/components/commons/FooterComponent.vue';

export default defineComponent({
    name: 'NotFound',
    components: {
        HeaderComponent,
        FooterComponent
    }
});
</script>

<style lang="scss" scoped>
.not-found {
    p {
        @include center;
        color: var(--c-text);
    }
}
</style>
