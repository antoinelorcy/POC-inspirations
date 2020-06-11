<template>
	<header class="header">
		<div class="h__inner inner-width">
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
					<p>{{ $t('hello', {name: 'Michel'}) }}</p>
				</div>
				<Button label="Se connecter" />
			</div>
		</div>
		<ReadingProgress v-if="hasReadingProgress" />
	</header>
</template>

<script>
import Logo from '~/components/Logo';
import ReadingProgress from '~/components/ReadingProgress';

export default {
	components: {
		Logo,
		ReadingProgress
	},

	props: {
		hasReadingProgress: Boolean
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
  width: 100%;
}

.h__inner {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100px;
	position: relative;

	@include breakpoint(medium) {
		height: 80px;
	}
}

.h__nav {
	margin-right: auto;
	margin-left: 3rem;
}

.h__nav__link {
	color: $body-font-color;
	font-weight: fw(medium);
	margin: 0 20px;

	&.active--exact {
		color: color(primary);
	}
}
</style>