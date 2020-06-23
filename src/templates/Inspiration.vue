<template>
	<Layout class="single" has-reading-progress :data-activity-type="activityType">
		<div class="single__breadcrumb inner-width hide-sm">
			<g-link :to="$t('URL.HOME')">Accueil</g-link> > <g-link :to="$t('URL.TEMPLATES')">Tous les templates</g-link> > {{ title }}
		</div>

		<div ref="coverMobile" class="single__cover-mobile" :class="{'single__cover-mobile--collapsed': isCoverMobileCollapse}">
			<div class="single__cover" :style="{backgroundImage: `url(${cover})`}">
				<h1 class="single__title">{{ title }}</h1>
				<span class="single__goal">> {{ goalLabel }}</span>
				
				<div v-if="isMobileNavigationVisible" class="single__mobile-navigation">
					<ul>
						<li><a href="#summary" @click.prevent="scrollTo('#summary')">Résumé</a></li>
						<li><a href="#prerequisite" @click.prevent="scrollTo('#prerequisite')">Pré-requis</a></li>
						<li>
							<a href="#steps" @click.prevent="scrollTo('#steps')">Déroulé</a>
							<ul>
								<li v-for="(step, index) in $page.inspiration.fields.steps" :key="index">
									<a :href="`#step-${index}`" @click.prevent="scrollTo(`#step-${index}`)">Etape {{ index + 1 }}</a>
								</li>
							</ul>
						</li>
						<li><a href="#suggestions" @click.prevent="scrollTo('#suggestions')">Suggestions et variantes</a></li>
						<li><a href="#ressources" @click.prevent="scrollTo('#ressources')">Ressources</a></li>
					</ul>
				</div>

				<div class="single__cm__footer">
					<Button :icon="isMobileNavigationVisible? 'close' : 'burger'" color="white" @click="toggleMobileNavigation" />
					<Button label="Utiliser ce modèle" color="primary" />
				</div>
			</div>
		</div>

		<div class="single__cover-wrapper hide-sm">
			<div class="single__cover" :style="{backgroundImage: `url(${cover})`}"></div>
		</div>
	
		<div class="single__wrapper inner-width">
			<section class="single__content">
				<h1 class="single__title hide-sm">{{ title }}</h1>
				<span class="single__goal hide-sm">> {{ goalLabel }}</span>
				<div id="summary" class="single__summary" v-html="$page.inspiration.fields.summary"></div>

				<div id="prerequisite" class="single__prequisite m--b-6">
					<h2>Pré-requis</h2>
					<div v-html="$page.inspiration.fields.prerequisite"></div>
				</div>

				<div class="single__settings m--b-6">
					<h4 v-if="activityDefinition">
						<BorderedIcon><Icon name="cog" :size="20" /></BorderedIcon> 
						Paramétrage de l'activité {{ activityDefinition.title }} 
						<ActivityIcon :name="activityDefinition.key" :type="activityType" />
					</h4>

					<ul>
						<li v-for="(setting, index) in $page.inspiration.fields.settings" :key="index">
							<Icon name="checkbox" />{{ setting.fields.label }}
						</li>
					</ul>
				</div>

				<div id="steps" class="single__steps m--b-6">
					<h2>Déroulé de l'activité</h2>

					<div :id="`step-${index}`" class="single__step" v-for="(step, index) in $page.inspiration.fields.steps" :key="index">
						<div class="ss__number"><span>{{ index + 1 }}</span></div>
						<div class="ss__content p--b-6">
							<h3>{{ step.fields.label }}</h3>
							<div v-html="step.fields.content"></div>
						</div>
					</div>
				</div>

				<div id="suggestions" class="single__suggestions m--b-6">
					<h2>Suggestions et variantes</h2>

					<div v-for="(suggestion, index) in $page.inspiration.fields.suggestions" :key="index" class="ssu__item">
						<Icon name="idea" />
						<div v-html="suggestion.fields.content"></div>
					</div>
				</div>

				<div id="ressources" class="single__ressources">
					<h2>Ressources</h2>

					<ul>
						<li v-for="(ressource, index) in $page.inspiration.fields.ressources" :key="index">
							<a :href="ressource.fields.url" target="_blank"><Icon name="external-link" /> {{ ressource.fields.label }}</a>
						</li>
					</ul>
				</div>
			</section>
			<section class="single__sidebar">
				<SingleCard
					ref="card"
					class="single__card"
					v-bind="sidebarProps"
					:style="{top: cardTopPosition + 'px'}"
				/>
			</section>
		</div>

		<Button
			v-if="isCoverMobileCollapse"
			icon="arrow-up"
			color="white"
			class="single__scroll-top-btn"
			@click="scrollTop"
		/>

		<SubFooterVideo slot="sub-footer-left" />
		<SubFooterSignup slot="sub-footer-right" />
	</Layout>
</template>

<page-query>
query page($id: ID!, $locale: String!) {
	inspiration: inspiration(id: $id) {
		id
		title
		url
		fields {
			thumbnail
			cover
			keywords
			goal {
				sys{id}
				fields {title}
			}
			level{sys{id}}
			timing{sys{id}}
			groupSize{sys{id}}
			length{
				sys {id}
				fields {
					minValue
					maxValue
					value
				}
			}
			goalLabel
			addedValue
			activity {
				sys { id }
				fields {
					key
					title
				}
			}
			summary
			prerequisite
			settings {
				fields {
				label
				}
			}
			steps {
				fields {
					label
					content
				}
			}
			suggestions {
				fields {
				content
				}
			}
			ressources {
				fields{
				url
				label
				}
			}
		}
	}

	activities: allActivity (filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				title
				key
				activityType {
					fields {
						title
						key
					}
				}
			}
		}
	}
}
</page-query>

<script>
import { throttle } from 'lodash-es';
import SubFooterVideo from '~/components/SubFooterVideo';
import SubFooterSignup from '~/components/SubFooterSignup';
import SingleCard from '~/components/SingleCard';
import ActivityIcon from '~/components/ActivityIcon';
import BorderedIcon from '~/components/BorderedIcon';

export default {
	metaInfo() {
		return {
			title: this.title,
			meta: [
				{
					key: 'author',
					name: 'author',
					content: 'Beekast'
				},
				{
					key: 'title',
					name: 'title',
					content: this.title
				},
				{
					key: 'description',
					name: 'description',
					content: this.$t('META.DESCRIPTION')
				},
				{
					key: 'og:title',
					name: 'og:title',
					content: this.title
				},
				{
					key: 'og:description',
					name: 'og:description',
					content: this.title
				},
				{
					key: 'twitter:creator',
					name: 'twitter:creator',
					content: '@beekast'
				},
				{
					key: 'twitter:title',
					name: 'twitter:title',
					content: this.title
				},
				{
					key: 'twitter:description',
					name: 'twitter:description',
					content: this.title
				}
			]
		}
	},

	components: {
		SubFooterVideo,
		SubFooterSignup,
		SingleCard,
		ActivityIcon,
		BorderedIcon
	},

	data () {
		return {
			cardTopPosition: 0,
			isCoverMobileCollapse: false,
			isMobileNavigationVisible: false
		};
	},

	computed: {
		title () {
			return this.$page.inspiration.title;
		},

		cover () {
			return this.$page.inspiration.fields.cover || this.$page.inspiration.fields.thumbnail;
		},

		goalLabel () {
			return this.$page.inspiration.fields.goal.fields.title;
		},

		activityDefinition () {
			const activityId = this.$page.inspiration.fields.activity.sys.id;
			const activityDefinition = this.$page.activities.edges.map((e) => e.node).find((n) => n.sysId === activityId);
			return activityDefinition;
		},
		
		activityType () {
			return this.activityDefinition.activityType.fields.key;
		},

		sidebarProps () {
			const page = this.$page.inspiration;
			return {
				locale: this.$context.locale,
				goalId: page.fields.goal.sys.id,
				levelId: page.fields.level.sys.id,
				timingId: page.fields.timing.sys.id,
				groupSizeIds: page.fields.groupSize.map((n) => n.sys.id),
				lengthIds: page.fields.length.map((n) => n.sys.id),
				activity: this.activityDefinition,
				goalLabel: page.fields.goalLabel,
				addedValue: page.fields.addedValue
			};
		}
	},

	created () {
		this.$i18n.set(this.$context.locale);
	},

	mounted () {
		this.$nextTick(() => {
			if (this.$store.state.isSmallWindow) {
				document.addEventListener('scroll', this.throttleScroll);
			} else {
				const $header = document.querySelector('.header');
				const $breadcrumb = document.querySelector('.single__breadcrumb');
				this.cardTopPosition = $header.offsetHeight + $breadcrumb.offsetHeight;
			}

			const $steps = document.querySelector('.single__steps');
			const $gifs = $steps.querySelectorAll('figure.gif');
			$gifs.forEach(($gif) => {
				this.setGif($gif);
			});
		});

		
	},

	beforeDestroy () {
		document.removeEventListener('scroll', this.throttleScroll);
	},

	methods: {
		throttleScroll: throttle(function () {
				this.scroll();
		}, 30),

		scroll () {
			this.isCoverMobileCollapse = document.documentElement.scrollTop > this.$refs.coverMobile.getBoundingClientRect().top + this.$refs.coverMobile.offsetHeight * .4;
		},

		scrollTo (selector) {
			const target = document.querySelector(selector);
			console.log(target.offsetTop + this.$refs.coverMobile.offsetHeight);
			document.documentElement.scrollTop = target.offsetTop + this.$refs.coverMobile.offsetHeight - 70;
			this.isMobileNavigationVisible = false;
		},

		scrollTop () {
			document.documentElement.scrollTop = 0;
		},

		toggleMobileNavigation () {
			// document.documentElement.scrollTop = this.$refs.coverMobile.getBoundingClientRect().top + this.$refs.coverMobile.offsetHeight * .4;
			this.isMobileNavigationVisible = !this.isMobileNavigationVisible;
		},

		setGif ($gif) {
			const img = $gif.querySelector('img');
			const gif = img.dataset.gif;

			// Preload
			const gifImage = new Image();
			gifImage.src = gif;

			// onClick
			$gif.addEventListener('click', (e) => {
				const $e = e.target.querySelector('img');
				const imgSrc = $e.src;
				const imgGif = $e.dataset.gif;
				$e.src = imgGif;
				$e.dataset.gif = imgSrc;
				
				if ($e.src.indexOf('.gif') > -1) {
					e.target.classList.add('gif--playing');
				} else {
					e.target.classList.remove('gif--playing');
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.single {
	@each $key, $value in $colors-activity-types {
		&[data-activity-type="#{$key}"] {
			.ss__number span {
				border-color: $value;
			}

			.single__settings:before {
				background-color: $value;
			}
		}
	}

	/deep/ .content {
		background: url('../assets/images/single-bg.svg') center right no-repeat;
	}
}

.single__wrapper {
	position: relative;
	display: flex;
	
	@include breakpoint(medium) {
		z-index: 0;
		display: flex;
		flex-direction: column;

		> .single__sidebar {
			order: 0;
		}

		> .single__content {
			order: 1;
		}
	}
}

.single__content {
	padding-top: 15rem;

	@include breakpoint(medium) {
		padding-top: 2rem;
	}
}

.single__sidebar {
	padding: 0 2rem;
	flex: 0 0 400px;

	@include breakpoint(medium) {
		padding: 2rem 0;
		flex: 0 0 auto;
	}
}

.single__cover-wrapper {
	position: relative;
	width: 100%;
	z-index: 0;
}

.single__cover {
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	position: absolute;
	top: 4rem;
	left: 0;
	right: 0;
	height: 300px;
}

.single__cover-mobile {
	position: sticky;
	top: 0;
	z-index: 100;
	height: 300px;
	display: none;

	@include breakpoint(medium) {
		display: block;
	}

	.single__cover {
		top: 0;
		z-index: 0;
		height: 300px;
		padding: 2rem;
		transition: all 0.3s ease;
	}

	.single__title,
	.single__goal {
		position: relative;
		z-index: 1;
	}

	.single__goal {
		transition: opacity 0.3s ease;
	}

	.single__mobile-navigation {
		position: absolute;
		top: 100%;
		left: 0;
		background: white;
		width: 100%;
		padding: 3rem 4rem;
		box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
		animation: mobile-nav 0.3s ease;

		@keyframes mobile-nav {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		ul {
			list-style: none;
			margin: 0;

			li {
				margin: 0.5rem 0;
			}
		}

		> ul {
			padding: 0;

			> li {
				margin-bottom: 1.5rem;
			}
		}

		a {
			font-size: fs(large);
			font-weight: fw(medium);
			text-decoration: none;
			color: color(grey);
		}
	}

	&--collapsed {
		.single__cover {
			height: 130px;
			box-shadow: 0 0px 30px rgba(0, 0, 0, 0.5);
		}

		.single__goal {
			opacity: 0;
		}
	}
}

.single__cm__footer {
	position: absolute;
	bottom: -2rem;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 1rem;
}

.single__title {
	color: color(white);
	margin: 0;
	font-size: 46px;
	text-shadow: 0 0 10px rgba(0, 0, 0, .5);

	@include breakpoint(medium) {
		font-size: 28px;
	}
}

.single__goal {
	color: color(white);
	font-size: 20px;
	margin-bottom: 2rem;
	display: block;
	text-shadow: 0 0 10px rgba(0, 0, 0, .5);

	@include breakpoint(medium) {
		font-size: 16px;
	}
}

.single__card {  
	position: -webkit-sticky;
	position: sticky;
	z-index: 90;
	top: 0;
	right: 0;

	@include breakpoint(medium) {
		position: relative;
		z-index: 0;
	}
}

.single__summary {
	position: relative;
	background: linear-gradient(180deg, #FFFFFF 55.21%, rgba(255, 255, 255, 0) 100%);
	padding: 3rem;
	margin: 0 0 0 -3rem;

	@include breakpoint(medium) {
		margin: 0;
		padding: 0;
		background: transparent;
	}

	&:before {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		height: 50px;
		right: 0;
		width: 100%;
		box-shadow: 0px -7px 14px rgba(0, 0, 0, 0.25);

		@include breakpoint(medium) {
			content: none;
		}
	}
}

.single__settings {
		position: relative;
		background: white;
		border: 1px dashed color(grey-light);
		padding: 2rem;

		&:before {
			content: '•';
			width: 25px;
			height: 30px;
			background-color: color(grey);
			border-radius: 5px 0 0 5px;
			position: absolute;
			top: -1px;
			left: -25px;
			color: color(grey-lighter);
			font-size: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 1;
		}

		> h4 {
			color: color(grey);
			display: flex;
			align-items: center;

			> .bordered-icon {
				margin-right: 1rem;
			}

			> .activity-icon {
				margin-left: 1rem;
			}
		}

		ul {
			list-style: none;

			> li {
				display: flex;
				align-items: center;

				> .icon {
					margin-right: 1rem;
				}
			}
		}
}

.single__step {
	display: flex;

	&:last-child {
		.ss__number:after {
			display: none;
		}
	}

	$ss-number-size: 25px;
	.ss__number {
		flex: 0 0 $ss-number-size;
		display: flex;
		flex-direction: column;
		align-items: center;

		&:after {
			content: '';
			flex: 1;
			width: 1px;
			border-left: 1px dashed color(grey-light);
		}

		> span {
			position: relative;
			z-index: 1;
			width: $ss-number-size;
			height: $ss-number-size;
			border-radius: $ss-number-size/2;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid color(grey);
			font-weight: fw(medium);
		}
	}

	.ss__content {
		padding-left: 1rem;
	}
}

.single__ressources {
	ul {
		list-style: none;
		padding: 0;

		a {
			display: flex;
			align-items: center;
			color: $body-font-color;

			> .icon {
				margin-right: 1rem;
			}
		}
	}
}

.single__suggestions {
	.ssu__item {
		display: flex;
		align-items: flex-start;

		> .icon {
			margin-right: 1rem;
		}
	}
}

.single__scroll-top-btn {
	position: fixed;
	bottom: 6rem;
	right: 1rem;
	z-index: 100;
	box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
	animation: from-bottom 0.3s ease;
}

@keyframes from-bottom {
	0% {
		opacity: 0;
		transform: translateY(10px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
}
</style>