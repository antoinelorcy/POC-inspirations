<template>
	<footer class="footer">
		<div class="inner-width footer__inner">
			<div class="footer__left">
				<g-image src="~/assets/images/logo-beekast.svg" width="130" class="footer__logo" />
				<p>
					Animez des réunions collaboratives et efficaces : favorisez la collaboration et engagez votre audience.
				</p>
				<div class="footer__social">
					<a href="" target="_blank">
						<g-image src="~/assets/images/social-linkedin.svg" width="35" />
					</a>
					<a href="" target="_blank">
						<g-image src="~/assets/images/social-facebook.svg" width="35" />
					</a>
					<a href="" target="_blank">
						<g-image src="~/assets/images/social-twitter.svg" width="35" />
					</a>
				</div>
			</div>
			<div class="footer__right hide-sm">
				<div class="footer__col">
					<h4>Produit</h4>
					<ul>
						<li><a href="" target="_blank">Découvrir Beekast</a></li>
						<li><a href="" target="_blank">Fonctionnalités</a></li>
						<li><a href="" target="_blank">Usages</a></li>
						<li><a href="" target="_blank">Tarifs</a></li>
					</ul>
				</div>
				<div class="footer__col">
					<h4>Ressources</h4>
					<ul>
						<li><a href="" target="_blank">Blogs</a></li>
						<li><a href="" target="_blank">Livres blancs</a></li>
						<li><a href="" target="_blank">Cas clients</a></li>
						<li><a href="" target="_blank">Centre d’aide</a></li>
					</ul>
				</div>
				<div class="footer__col">
					<h4>Société</h4>
					<ul>
						<li><a href="" target="_blank">Présentation</a></li>
						<li><a href="" target="_blank">Travailler chez Beekast</a></li>
						<li><a href="" target="_blank">Partenaires</a></li>
						<li><a href="" target="_blank">Espace Presse</a></li>
					</ul>
				</div>
				<div class="footer__col">
					<h4>Contacts</h4>
					<ul>
						<li><a href="" target="_blank">Demander une démo</a></li>
						<li><a href="" target="_blank">Contactez-nous</a></li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	background: url('../assets/images/footer/bg.svg') top left no-repeat color(primary-dark);
	color: color(white);
	padding: 50px 0;
	position: relative;

	&:before{
		content: '';
		background: #EBE8F2;
		opacity: 0.2;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		height: 10px;
	}
}

.footer__inner {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	@include breakpoint(medium) {
		justify-content: center;
	}
}

.footer__left {
	flex: 0 0 30rem;
}

.footer__right {
	display: flex;
	justify-content: space-between;
	flex: 1;
	margin-left: 10rem;
}

.footer__col {
	flex: 0 0 25%;

	> h4 {
		color: color(white);
		margin-bottom: space(2);
		
		&:after {
			content: '';
			width: 30px;
			height: 3px;
			background: color(orange);
			border-radius: 5px;
			display: block;
			margin-top: space(2);
		}
	}

	> ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		margin-bottom: space(2);
	}

	a {
		color: color(white);
		font-size: fs(small);
	}
}

.footer__social {
	display: flex;
	margin-top: 2rem;

	> a {
		margin-right: 2rem;
	}
}

.footer__logo {
	margin-bottom: 1rem;
}
</style>