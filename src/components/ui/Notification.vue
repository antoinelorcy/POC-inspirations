<template>
	<span class="notification">
		{{ count }}
	</span>
</template>

<script>
export default {
	props: {
		count: Number
	}
}
</script>

<style lang="scss" scoped>
.notification {
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	background-color: color(primary);
	color: color(white);
	font-size: 1.1rem;
}
</style>