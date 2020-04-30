<template>
	<Layout>
    <div class="inspirations">
      <div class="i__left">
        <Filters v-model="goals" title="Objectifs" />
        <!-- <Filters v-model="groupSizes" title="Groupes" /> -->

        <h3>Groupes</h3>
        <div>
          <input type="radio" name="group" id="group0" value="" v-model="checkedGroupSizes" />
          <label for="group0">Tous</label>
        </div>
        <div v-for="g in groupSizes" :key="g.id">
          <input type="radio" name="group" :id="g.id" :value="g.id" v-model="checkedGroupSizes" />
          <label :for="g.id">{{ g.title }}</label>
        </div>

        <Filters v-model="lengths" title="Durée" />
        
        <div>
          <h3>Ordre de tri :</h3>
          <select v-model="order">
            <option v-for="option in orders" :key="option.key" :value="option.key">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    <div class="i__right">
        <input placeholder="Rechercher par mots-clés" v-model="search" />
        <div v-if="!orderedPages.length">:(</div>
        <transition-group v-else name="flip-list" tag="ul">
          <li v-for="page in orderedPages" :key="page.id" class="i__card-wrapper">
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
        updatedAt
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

  lengths: allContentfulLength (sortBy: "order", order: ASC ) {
    edges {
      node {
        id
        title
      }
    }
  }

  groupSizes: allContentfulGroupSize (sortBy: "order", order: ASC ) {
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
      checkedGroupSizes: '',
      lengths: [],
      search: '',
      order: null,
      orders: [
        { key: 'date', label: 'Par date' },
        { key: 'name', label: 'Par nom' }
      ]
    }
  },

  mounted () {
    this.order = this.orders[0].key;

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

    orderedPages () {
      let filteredPages = this.pages.filter((p) => {
        let r = true;
        if (this.checkedGoals.length && p.goal && r) {
          if (!p.groupSize.length) return;
          r = this.checkedGoals.includes(p.goal.id)
        }
        
        if (this.checkedGroupSizes.length && r) {
          if (!p.groupSize.length) return;
          // r = (p.groupSize.map((g) => g.id).filter(groupId => this.checkedGroupSizes.includes(groupId))).length;
          r = p.groupSize.map((g) => g.id).includes(this.checkedGroupSizes);
        }

        if (this.checkedLengths.length && r) {
          if (!p.length.length) return;
          r = (p.length.map((g) => g.id).filter(lengthId => this.checkedLengths.includes(lengthId))).length;
        }

        if (this.search !== '' && r) {
          r = p.keywords.join().toLowerCase().indexOf(this.search) > -1
        }
      
        return r
      });
  
      switch (this.order) {
        case 'date':
          return filteredPages.sort((a, b) => b.updatedAt - a.updatedAt);
          break;
        case 'name':
          return filteredPages.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          return filteredPages;
      }
    },

    checkedGoals () {
      return this.goals.filter((g) => g.checked).map((g) => g.id);
    },
    
    // checkedGroupSizes () {
    //   return this.groupSizes.filter((g) => g.checked).map((g) => g.id);
    // },

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
