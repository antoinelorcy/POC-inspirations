<template>
  <Layout>
    <div>
      <h1>Des inspirations pour toutes vos réunions</h1>
      <p>Essayez nos modèles prêts à l’emploi pour démarrez rapidement ou renouveller vos activités de réunion dans Beekast. Suivez le guide et animez des réunions collaboratives et efficaces.</p>
      <HomeFilters />
    </div>
    <div>
      <h2>Nos inspirations du moment</h2>
      <ul>
        <li
          v-for="page in lastPages"
          :key="page.id"
        >
        <Card
          :thumbnail="page.thumbnail.file.url"
          :title="page.title" :path="page.path"
          :goal="page.goal"
          :level="page.level"
          :group-size="page.groupSize"
          :length="page.length"
        />
        </li>
      </ul>
    </div>
  </Layout>
</template>

<page-query>
query {
  lastPages: allContentfulPage(limit: 3, sortBy: "date") {
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

  // data () {
  //   return {
  //     goals: [],
  //     checkedGoals: []
  //   }
  // },

  // mounted () {
  //   this.goals = this.$static.goals.edges.map((g) => {
  //     return {
  //       id: g.node.id,
  //       title: g.node.title,
  //       checked: true
  //     }
  //   })

  //   this.checkedGoals = this.goals.map((g) => g.id);
  // },

  // computed: {
  //   inpirationPages () {
  //     return this.$page.pages.filter((p) => {
  //       console.log(p);
  //       return p.context.goal && this.checkedGoals.includes(p.context.goal)
  //     })
  //   }
  // }
}
</script>
