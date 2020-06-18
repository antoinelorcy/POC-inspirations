<template>
	<header class="header">
		<div class="h__inner inner-width">
			<div v-if="$store.state.isSmallWindow">
				<LangSelector />
			</div>
			<g-link :to="$t('URL.HOME')">
				<Logo />
			</g-link>
			<nav v-if="!$store.state.isSmallWindow" class="h__nav">
				<g-link class="h__nav__link" :to="$t('URL.HOME')">{{ $t('HEADER.HOME') }}</g-link>
				<g-link class="h__nav__link" :to="$t('URL.TEMPLATES')">{{ $t('HEADER.TEMPLATES') }}</g-link>
				<g-link class="h__nav__link" :to="$t('URL.EXTERNAL_CORPORATE')">{{ $t('HEADER.DISCOVER') }}</g-link>
			</nav>
			<div class="h__account-and-lang">
				<LangSelector v-if="!$store.state.isSmallWindow" class="m--r-2" />
				<div v-if="isSignedUp">
					<p>{{ $t('hello', {name: 'Michel'}) }}</p>
				</div>
				<Button :to="$t('URL.EXTERNAL_APP')" v-else :label="$t('ACCOUNT.SIGNIN')" />
			</div>
		</div>
		<ReadingProgress v-if="hasReadingProgress" />
	</header>
</template>

<script>
import Logo from '~/components/Logo';
import ReadingProgress from '~/components/ReadingProgress';
import LangSelector from '~/components/LangSelector';

export default {
	components: {
		Logo,
		ReadingProgress,
		LangSelector
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

.h__account-and-lang {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>