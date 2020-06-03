<template>
  <Layout>
    <section class="home__section hero">
      <h1>Des inspirations pour toutes vos réunions</h1>
      <p class="text-align--left">Essayez nos modèles prêts à l’emploi pour démarrez rapidement ou renouveller vos activités de réunion dans Beekast. Suivez le guide et animez des réunions collaboratives et efficaces.</p>
      <HomeFilters />
      <p>Ou <Link label="Voir toutes les inspirations" to="/inspirations" /></p>
    </section>

    <section class="home__section last">
      <div class="section_title">
        <h2>Nos inspirations du moment</h2>
        <Link label="Voir toutes les inspirations" to="/inspirations" />
      </div>
      <div class="grid">
        <div
          v-for="page in lastPages"
          :key="page.id"
          class="col-lg-6 p--4"
        >
        <Card
          :thumbnail="page.thumbnail.file.url"
          :title="page.title" :path="page.path"
          :goal="page.goal"
          :level="page.level"
          :group-size="page.groupSize"
          :length="page.length"
        />
        </div>
      </div>
    </section>

     
     <section class="home__section about">
        <div class="section_title">
            <h2>Beekast, qu’est-ce que c’est ?</h2>
        </div>

        <p class="about__description">
          Beekast est une plateforme de réunion intéractive qui vous accompagne au quotidien dans la création, l’animation et le suivi de tout type de réunion : du daily à l’atelier, du séminaire à l’entretien individuel.
        </p>

        <div class="grid">
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
query {
  lastPages: allContentfulPage(limit: 4, sortBy: "date") {
    edges {
      node {
        id
        path
        title
        thumbnail {
          file {
            url
          }
        }
        goal {
          id
        }
        length {
          id
        }
        groupSize {
          id
        }
        level {
          id
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
  metaInfo: {
    title: 'Accueil'
  },

  components: {
    Card,
    HomeFilters,
    SubFooterDiscover,
    SubFooterSignup
  },

  computed: {
    lastPages () {
      return this.$page.lastPages.edges.map((edge) => edge.node);
    }
  }
}
</script>


<style lang="scss" scoped>
.home__section {
  margin-bottom: space(6);
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
  }

  > .home-filters {
    margin: 60px auto 40px;
  }

  @include breakpoint(medium) {
    padding: 0;
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