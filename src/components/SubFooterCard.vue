<template>
	<div class="sub-footer-card">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.sub-footer-card {
	position: relative;
	text-align: center;
	padding: 6rem;

	> p {
		font-weight: $font-weight-semi-bold;
		font-size: fs(large);
		margin-bottom: 35px;
	}
}
</style>