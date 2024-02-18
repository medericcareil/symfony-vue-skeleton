<template>
	<header-component></header-component>
	<div class="container">
		<h1>Home page</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '@/components/commons/HeaderComponent.vue';

export default defineComponent({
	name: 'Home',
	components: {
		HeaderComponent
	},
	// created() {
	// 	console.log('Create composent');
	// },
	// beforeUnmount () {
	// 	this.error = null;
	// 	console.log('Destroy composent');
	// }
});
</script>

<style lang="scss" scoped>
	// Your scoped scss
</style>
