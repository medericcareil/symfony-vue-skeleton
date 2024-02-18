<template>
    <div class="loading-dual-ring"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoaderComponent'
})
</script>

<style lang="scss" scoped>
    .loading-dual-ring {
        display: inline-block;
        width: 50px;
        height: 50px;
    }
    .loading-dual-ring:after {
        content: " ";
        display: block;
        width: 40px;
        height: 40px;
        margin: 8px;
        border-radius: 50%;
        border: 4px solid var(--c-tertiary);
        border-color: var(--c-tertiary) transparent var(--c-tertiary) transparent; 
        animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    :root[data-theme='dark'] .loading-dual-ring:after {
        border: 4px solid var(--c-primary);
        border-color: var(--c-primary) transparent var(--c-primary) transparent; 
    }
</style>
