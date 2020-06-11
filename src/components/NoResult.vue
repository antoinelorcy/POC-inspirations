<template>
	<div class="no-result">
		<g-image src="~/assets/images/no-result.svg" width="300" />
		<h2>Votre recherche ne donne aucun résultat</h2>
		<p>
			Essayez une nouvelle recherche en vérifiant l'orthographe des mots clés ou en utilisant d’autres filtres.
		</p>
	</div>
</template>

<style lang="scss" scoped>
.no-result {
	text-align: center;

	h2 {
		color: $body-font-color;
	}
}
</style>