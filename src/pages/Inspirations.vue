<template>
	<Layout>
    <div class="inspirations">
      <div class="i__left">
        <Filters v-model="goals" title="Objectifs" />
        <Filters v-model="groupSizes" title="Groupes" />
        <Filters v-model="lengths" title="Durée" />
      </div>
    <div class="i__right">
        <input placeholder="Rechercher par mots-clés" v-model="search" />
        <div v-if="!filteredPages.length">:(</div>
        <transition-group v-else name="flip-list" tag="ul">
          <li v-for="page in filteredPages" :key="page.id" class="i__card-wrapper">
            <Card :thumbnail="page.thumbnail.file.url" :title="page.title" :path="page.path" />
          </li>
        </transition-group>
    </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  pages: allContentfulPage {
    edges {
      node {
        id
        path
        title
        keywords
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
      }
    }
  }
}
</page-query>

<static-query>
query {
  goals: allContentfulGoal {
    edges {
      node {
        id
        title
      }
    }
  }

  lengths: allContentfulLength (sortBy: "id") {
    edges {
      node {
        id
        title
      }
    }
  }

  groupSizes: allContentfulGroupSize {
    edges {
      node {
        id
        title
      }
    }
  }
}
</static-query>

<script>
import Card from '~/components/Card';
import Filters from '~/components/Filters';

export default {
  metaInfo: {
    title: 'Inspirations',
    name: 'inspirations'
  },

  components: {
    Card,
    Filters
  },

  data () {
    return {
      goals: [],
      groupSizes: [],
      lengths: [],
      search: ''
    }
  },

  mounted () {
    this.goals = this.$static.goals.edges.map((g) => {
      return {
        id: g.node.id,
        title: g.node.title,
        checked: this.$route.query.goal && this.$route.query.goal === g.node.id
      }
    })

    this.groupSizes = this.$static.groupSizes.edges.map((g) => {
      return {
        id: g.node.id,
        title: g.node.title,
        checked: this.$route.query.groupSize && this.$route.query.groupSize === g.node.id
      }
    })

    this.lengths = this.$static.lengths.edges.map((g) => {
      return {
        id: g.node.id,
        title: g.node.title,
        checked: false
      }
    })

    // this.$router.replace({ query: {}});
  },

  computed: {
    pages () {
      return this.$page.pages.edges.map((e) => e.node);
    },
  
    filteredPages () {
      return this.pages.filter((p) => {
        console.log(p);
        if (this.search !== '') {
          return p.keywords.join().toLowerCase().indexOf(this.search) > -1
        }

        let r = true;

        if (this.checkedGoals.length) {
          r = this.checkedGoals.includes(p.goal.id)
        }
        
        if (this.checkedGroupSizes.length && r) {
          r = this.checkedGroupSizes.includes(p.groupSize.id)
        }

        if (this.checkedLengths.length && r) {
          r = this.checkedLengths.includes(p.length.id)
        }
      
        return r
      })
    },

    checkedGoals () {
      return this.goals.filter((g) => g.checked).map((g) => g.id);
    },
    
    checkedGroupSizes () {
      return this.groupSizes.filter((g) => g.checked).map((g) => g.id);
    },

    checkedLengths () {
      return this.lengths.filter((g) => g.checked).map((g) => g.id);
    }
  }
}
</script>

<style>
.inspirations {
  display: flex;
}

.i__left {
  flex: 0 0 20rem;
}

.i__right {
  flex: 1;
}

.i__right ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  list-style: none;
  padding: 0;
}

.i__card-wrapper {
  padding: 1rem;
}

.flip-list-move {
  transition: transform 0.3s ease;
}
</style>
