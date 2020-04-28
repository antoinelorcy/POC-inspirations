<template>
	<g-link class="card" :to="path">
		<g-image :src="thumbnail" width="250" />
		<h4>{{ title }}</h4>
	</g-link>
</template>

<script>
export default {
	props: {
		title: String,
		thumbnail: String,
		path: String
	}
}
</script>

<style>
.card {
	text-decoration: none;
	color: #343434;
}

.card img {
	width: 200px;
	height: 130px;
	overflow: hidden;
	object-fit: cover;
	border-radius: 10px;
}

.card h4 {
	margin: 0;
}
</style>