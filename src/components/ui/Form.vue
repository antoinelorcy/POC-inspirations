<template>
	<form class="form" @submit.prevent="$emit('submit')">
		<slot name="default" />

		
		<div v-if="isSubmitted" class="form-footer p--4">
			<b>Merci</b>, nous vous contacterons très prochainement ! :)
		</div>

		<div v-if="$slots.footer" class="form-footer">
			<slot name="footer" />
		</div>
	</form>
</template>

<script>
export default {
	props: {
		isSubmitted: Boolean
	}
}
</script>

<style lang="scss" scoped>
.form-footer {
	display: flex;
	justify-content: flex-end;

	> button {
		margin-left: space(2);
	}
}
</style>