<template>
	<Layout>
    <div class="inspirations">
      <div class="i__left">
        <Filters v-model="goals" title="Objectifs" />
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
}
</static-query>

<script>
import Card from '~/components/Card';
import Filters from '~/components/Filters';

export default {
  metaInfo: {
    title: 'Inspirations'
  },

  components: {
    Card,
    Filters
  },

  data () {
    return {
      goals: [],
      lengths: [],
      search: ''
    }
  },

  mounted () {
    this.goals = this.$static.goals.edges.map((g) => {
      return {
        id: g.node.id,
        title: g.node.title,
        checked: true
      }
    })

    this.lengths = this.$static.lengths.edges.map((g) => {
      return {
        id: g.node.id,
        title: g.node.title,
        checked: true
      }
    })
  },

  computed: {
    pages () {
      return this.$page.pages.edges.map((e) => e.node);
    },
  
    filteredPages () {
      return this.pages.filter((p) => {
        if (this.search !== '') {
          return p.keywords.join().toLowerCase().indexOf(this.search) > -1
        }

        return this.checkedGoals.includes(p.goal.id) &&
          this.checkedLengths.includes(p.length.id)
      })
    },

    checkedGoals () {
      return this.goals.filter((g) => g.checked).map((g) => g.id);
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
