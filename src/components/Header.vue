<template>
	<header class="header">
		<div v-if="$store.state.isSmallWindow">
			Lang
		</div>
		<g-link to="/">
			<Logo />
		</g-link>
		<nav v-if="!$store.state.isSmallWindow" class="h__nav">
			<g-link class="h__nav__link" to="/">Accueil</g-link>
			<g-link class="h__nav__link" to="/inspirations/">Tous les templates</g-link>
			<g-link class="h__nav__link" to="https://www.beekast.com">Découvrir Beekast</g-link>
		</nav>
		<div class="h__account">
			<div v-if="isSignedUp">
				Account here
			</div>
			<Button label="Se connecter" />
		</div>
	</header>
</template>

<script>
import Logo from '~/components/Logo';

export default {
	components: {
		Logo
	},

	data () {
		return {
			isSignedUp: false
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}

.h__nav__link {
	color: $body-font-color;
	font-weight: $font-weight-semi-bold;
	margin: 0 20px;

	&.active--exact {
		color: color(primary);
	}
}
</style>