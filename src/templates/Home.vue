<template>
	<Layout :locale="$context.locale">
	<section class="home__section hero inner-width">
		<h1>{{ $page.home.title }}</h1>
		<p class="text-align--left">Essayez nos modèles prêts à l’emploi pour démarrer rapidement ou renouveller vos activités de réunion dans Beekast. Suivez le guide et animez des réunions collaboratives et efficaces.</p>
		<HomeFilters :locale="$context.locale" />
		<p>Ou <Link label="Voir toutes les inspirations" :to="$t('URL.TEMPLATES')" /></p>
	</section>

	<section class="home__section last inner-width">
	  <div class="section_title">
		<h2>Nos inspirations du moment</h2>
	  </div>
	  <div class="grid home__cards">
		<div
		  v-for="page in lastInspirations"
		  :key="page.url"
		  class="col-lg-6 home__card-container"
		>
		<Card
			:locale="$context.locale"
			:thumbnail="page.fields.thumbnail"
			:title="page.title"
			:url="page.url"
			:goal-id="page.goalId"
			:level-id="page.levelId"
			:group-size-ids="page.groupSizeIds"
			:length-ids="page.lengthIds"
			:goal-label="page.fields.goalLabel"
			:added-value="page.fields.addedValue"
		 	:activity-icon="page.activityIcon"
			 class="home__card"
		/>
		</div>

		<div class="p--3 fluid-width text-align--center">
		 <Link label="Voir toutes les inspirations" :to="$t('URL.TEMPLATES')" />
		</div>
	  </div>
	</section>

	 
	 <section class="home__section about inner-width">
		<div class="section_title">
			<h2>Beekast, qu’est-ce que c’est ?</h2>
		</div>

		<p class="about__description">
		  Beekast est une plateforme de réunion intéractive qui vous accompagne au quotidien dans la création, l’animation et le suivi de tout type de réunion : du daily à l’atelier, du séminaire à l’entretien individuel.
		</p>

		<div class="about__cols grid">
		  <div class="about__col col-md-4">
			<h5>Préparez</h5>
			<div class="about__img">
			  <g-image src="~/assets/images/about/prepare.svg" width="300" />
			</div>
			<p>Préparez votre réunion avec des activités interactives pour engager vos participants</p>
		  </div>
		  <div class="about__col col-md-4">
			<h5>Brainstormez</h5>
			<div class="about__img">
			  <g-image src="~/assets/images/about/brainstorming.svg" width="300" />
			</div>
			<p>Brainstormez ensemble et construisez un plan d’action</p>
		  </div>
		  <div class="about__col col-md-4">
			<h5>Récoltez</h5>
			<div class="about__img">
			  <g-image src="~/assets/images/about/export.svg" width="300" />
			</div>
			<p>Ou récoltez du feedback voire challengez</p>
		  </div>
		</div>
	 </section>
	<SubFooterDiscover slot="sub-footer-left" />
	<SubFooterSignup slot="sub-footer-right" />
  </Layout>
</template>

<page-query>
query page ($id: ID!, $locale: String!) {
	home: home (id: $id) {
		title
		locale
	}

	lastInspirations: allInspiration(limit: 4, sortBy: "date", filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				title
				url
				fields {
					thumbnail
					goal {sys{id}}
					level{sys{id}}
					groupSize{sys{id}}
					length{sys{id}}
					goalLabel
					addedValue
					activity {
						fields {
							key
							title
						}
					}
				}
			}
		}
	}
}
</page-query>

<script>
import Card from '~/components/Card';
import HomeFilters from '~/components/HomeFilters';
import SubFooterDiscover from '~/components/SubFooterDiscover';
import SubFooterSignup from '~/components/SubFooterSignup';

export default {
	components: {
		Card,
		HomeFilters,
		SubFooterDiscover,
		SubFooterSignup
	},

	computed: {
		lastInspirations () {
			return this.$page.lastInspirations.edges.map((edge) => {
				return {
					...edge.node,
					goalId: edge.node.fields.goal.sys.id,
					levelId: edge.node.fields.level.sys.id,
					groupSizeIds: edge.node.fields.groupSize.map((n) => n.sys.id),
					lengthIds: edge.node.fields.length.map((n) => n.sys.id),
					activityIcon : edge.node.fields.activity.fields.key
				}
			});
		}
	},
	
	created () {
		this.$i18n.set(this.$context.locale);
	}
}
</script>

<style lang="scss" scoped>
.home__section {
  margin-bottom: space(6);
}

.home__card-container {
	padding: space(4);

	@include breakpoint(medium) {
		padding: 0;
		margin-bottom: space(4);
	}
}

.hero  {
  background: url('../assets/images/home-filters-bg.svg') bottom center no-repeat;
  text-align: center;
  padding: 0 50px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  > h1 {
    margin-bottom: space(5);
    font-size: 44px;
	color: color(grey);
	
	@include breakpoint(medium) {
		font-size: 30px;
	}
  }

  > .home-filters {
    margin: 60px auto 40px;
  }

  @include breakpoint(medium) {
    padding: 0 1rem;
    margin-bottom: 50px;
  }
}

.section_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: space(5);

  > h2 {
    font-size: fs(large);
    color: color(grey);
    display: inline-flex;
    align-items: center;
    margin: 0;

    &:before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 20px;
      background: color(grey-light);
      border-radius: 5px;
      margin-right: space(2);
    }
  }
}

.about__description {
  margin-bottom: space(6);
}

.about__cols {
  margin-top: 5rem;
}

.about__col {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  > h5 {
    font-family: $ff2;
    font-size: 23px;
    font-weight: normal;
    color: color(grey);
  }

  > .about__img {
      flex: 0 0 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: space(2);
  }
}
</style>