<template>
  <Layout>
    <div>
      <h2>Simple form filter</h2>
      <HomeFilters />
    </div>
    <div>
      <h2>About</h2>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum iste ullam autem quasi. Numquam exercitationem iure illo deleniti ea reiciendis fuga beatae explicabo tempore laborum modi excepturi quas, nemo suscipit.
    </div>
    <div>
      <h2>Last {{ lastPages.length }} inspiration</h2>
      <!-- <g-link v-for="page in lastPages" :key="page.id" :to="page.path">
        <g-image :src="page.thumbnail.file.url" width="250" />
        <h3>{{ page.title }}</h3>
      </g-link> -->

      <Card v-for="page in lastPages" :key="page.id" :thumbnail="page.thumbnail.file.url" :title="page.title" :path="page.path" />
    </div>
  </Layout>
</template>

<page-query>
query {
  lastPages: allContentfulPage(limit: 1, sortBy: "date") {
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
