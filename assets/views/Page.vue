<template>
    <header-component></header-component>
    <div class="container">
        <h1>Title exemple</h1>
        <button class="btn btn-success" @click="downloadPDF()">Download PDF</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/commons/HeaderComponent.vue';
import RequestService from '@/core/services/requests/request-service';
import { download } from '@/core/services/utils/download';

export default defineComponent({
    name: 'Page',
    components: {
        HeaderComponent
    },
    methods: {
        downloadPDF(): void {
            const request: RequestService = RequestService.getInstance();
            request.get<any>('/exemple/get-exemple', { responseType: 'blob' }).then((response: any) => download(response));
        }
    }
});
</script>

<style lang="scss" scoped>
    button { margin-top: 30px; &:hover { opacity: .8; } }
</style>
