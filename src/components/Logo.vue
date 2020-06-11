<template>
	<div class="logo">
		<g-image src="~/assets/images/logo-beekast-inspirations.svg" width="175" />
	</div>
</template>

<style lang="scss" scoped>
.logo {
	@include breakpoint(medium) {
		img {
			width: 130px;
		}
	}
}
</style>