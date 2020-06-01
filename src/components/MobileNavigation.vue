<template>
	<div class="mobile-navigation">
		<g-link class="h__nav__link" to="/">Accueil</g-link>
		<g-link class="h__nav__link" to="/inspirations/">Tous les templates</g-link>
		<g-link class="h__nav__link" to="https://www.beekast.com">Découvrir Beekast</g-link>
	</div>
</template>

<style lang="scss" scoped>
.mobile-navigation {
	height: $mobile-nav-height;
	background-color: color(white);
	box-shadow: 0 0 10px rgba(color(black-light), 0.3);
	display: flex;
	align-items: center;
	justify-content: space-around;
}
</style>