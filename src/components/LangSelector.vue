<template>
	<Select
		v-show="$context.translations"
		:value="currentLocale"
		value-key="label"
		:options="availableLocales"
		close-on-select
		:has-min-width="false"
		class="lang-selector"
		@input="setLocale"
	/>
</template>

<script>
export default {
	computed: {
		currentLocale () {
			return {
				value: this.$i18n.locale(),
				label: this.$i18n.locale().toUpperCase()
			};
		},

		availableLocales () {
			return this.$i18n.locales().map((l) => {
				return {
					value: l,
					label: l.toUpperCase()
				};
			});
		}
	},

	methods: {
		setLocale (locale) {
			const translatedPage = this.$context.translations.find((t) => t.locale === locale.value);
			if (translatedPage) {
				this.$i18n.set(locale.value);
				this.$router.push(translatedPage.url);
			}
		}
	}
}
</script>


<style lang="scss" scoped>
.lang-selector.select {
	min-width: 70px;
}
</style>
