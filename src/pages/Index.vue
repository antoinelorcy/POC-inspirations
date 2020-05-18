<template>
  <Layout>
    <div class="hero">
      <h1>Des inspirations pour toutes vos réunions</h1>
      <p>Essayez nos modèles prêts à l’emploi pour démarrez rapidement ou renouveller vos activités de réunion dans Beekast. Suivez le guide et animez des réunions collaboratives et efficaces.</p>
      <HomeFilters />
    </div>
    <div class="last">
      <h2>Nos inspirations du moment</h2>
      <div class="grid">
        <div
          v-for="page in lastPages"
          :key="page.id"
          class="col-lg-3 p--4"
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
    </div>
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

export default {
  metaInfo: {
    title: 'Accueil'
  },

  components: {
    Card,
    HomeFilters
  },

  computed: {
    lastPages () {
      return this.$page.lastPages.edges.map((edge) => edge.node);
    }
  }
}
</script>


<style lang="scss" scoped>
.hero  {
  text-align: center;
  padding: 0 50px;
  margin-bottom: 80px;

  > h1 {
    margin-bottom: space(5);
  }

  > .home-filters {
    margin-top: space(5);
  }
}
</style>