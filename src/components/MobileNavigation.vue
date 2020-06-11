<template>
	<div class="mobile-navigation">
		<g-link class="h__nav__link" to="/">
			<Icon name="home" :size="25" />
			Accueil
		</g-link>
		<g-link class="h__nav__link" to="/inspirations/">
			<Icon name="activities" :size="25" />
			Modèles
		</g-link>
		<g-link class="h__nav__link" to="https://www.beekast.com">
			<Icon name="bee" :size="25" />
			Beekast
		</g-link>
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

	> a {
		position: relative;
		flex: 1;
		height: 100%;
		color: $body-font-color;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: fs(small);
		
		&:after {
			content: '';
			width: 100%;
			height: 1px;
			background-color: color(primary);
			position: absolute;
			bottom: 0;
			opacity: 0;
		}

		&.active--exact {
			color: color(primary);

			&:after {
				opacity: 1;
			}
		}
	}
}
</style>