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
	height: 100%;

	> p {
		font-weight: fw(medium);
		font-size: fs(large);
		margin-bottom: 35px;
	}
}
</style>