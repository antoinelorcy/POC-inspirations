<template>
	<Layout>
    <div class="inspirations inspi inner-width">
      <div v-if="!$store.state.isSmallWindow || filtersVisible" class="inspi__filters">
        <Filters
          v-on-clickaway="hideFilters"
          :goals="goals"
          :group-sizes="groupSizes"
          :levels="levels"
          :length="length"
          :timings="timings"
          :filters-count="filtersCount"
          :results-count="resultsCount"
          @change-length="onLengthChange"
          @close="filtersVisible = false"
          @reset="resetFilters"
        />
      </div>
      <div class="inspi__list">
          <div class="list__search-and-ordering">
            <Input placeholder="Rechercher par mots-clés" icon="search" v-model="search" />
            <div>
              <Button v-if="$store.state.isSmallWindow" :label="`Filtres (${filtersCount})`" @click="filtersVisible = true" />
            </div>
          </div>
          <div class="list__count-and-ordering">
            <div class="list__count">{{ orderedPages.length }} activités</div>
            <div class="list__order">
              Trier par <Select :value="order" @input="order = $event" :options="orders" value-key="label" close-on-select />
            </div>
          </div>
          <div v-if="!orderedPages.length">:(</div>
          <transition-group v-else name="flip-list" tag="ul">
            <li v-for="page in orderedPages" :key="page.id" class="inspi__card-wrapper">
              <Card
                :thumbnail="page.thumbnail.file.url"
                :title="page.title"
                :path="page.path"
                :goal="page.goal"
                :level="page.level"
                :group-size="page.groupSize"
                :length="page.length"
                :goal-label="page.goalLabel"
                :added-value="page.addedValue"
                :activity-icon="(page.activity && page.activity.key) || ''"
                :activity-type="(page.activity && page.activity.activityType && page.activity.activityType.key) || ''"
              />
            </li>
          </transition-group>
      </div>
    </div>

    <SubFooterVideo slot="sub-footer-left" />
    <SubFooterSignup slot="sub-footer-right" />
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
        goalLabel
        addedValue
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
          minValue
          maxValue
        }
        groupSize {
          id
        }
        level {
          id
        }
        timing {
          id
        }
        activity {
          key
          activityType {
            key
          }
        }
      }
    }
  }
}
</page-query>

<static-query>
query {
  goals: allContentfulGoal (sortBy: "order", order: ASC) {
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
        minValue
        maxValue
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

  levels: allContentfulLevel (sortBy: "order", order: ASC) {
    edges {
      node {
        id
        title
      }
    }
  }

  timings: allContentfulTiming (sortBy: "order", order: ASC) {
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
import { mixin as clickaway } from "vue-clickaway";
import Card from '~/components/Card';
import Filters from '~/components/Filters';
import SubFooterVideo from '~/components/SubFooterVideo';
import SubFooterSignup from '~/components/SubFooterSignup';

export default {
  metaInfo: {
    title: 'Inspirations',
    name: 'inspirations'
  },

  mixins: [clickaway],

  components: {
    Card,
    Filters,
    SubFooterVideo,
    SubFooterSignup
  },

  data () {
    return {
      goals: [],
      groupSizes: [],
      levels: [],
      timings: [],
      length: [5, 100],
      search: '',
      order: {},
      orders: [
        { id: 'date', value: 'date', label: 'Par date' },
        { id: 'name', value: 'name', label: 'Par nom' }
      ],
      filtersVisible: false
    }
  },

  mounted () {
    this.order = this.orders[0];

    this.goals = this.$static.goals.edges.map((g) => {
      return {
        id: g.node.id,
        label: g.node.title,
        checked: this.$route.query.goal && this.$route.query.goal === g.node.id
      }
    })

    this.groupSizes = this.$static.groupSizes.edges.map((g) => {
      return {
        id: g.node.id,
        label: g.node.title,
        checked: this.$route.query.groupSize && this.$route.query.groupSize === g.node.id
      }
    })

    this.levels = this.$static.levels.edges.map((g) => {
      return {
        id: g.node.id,
        label: g.node.title,
        checked: false
      }
    })

    this.timings = this.$static.timings.edges.map((g) => {
      return {
        id: g.node.id,
        label: g.node.title,
        checked: false
      }
    })

    // this.$router.replace({ query: {}});

    this.$watch('filtersVisible', (bool) => {
      const bodySrollLockedClassname = 'body--is-scroll-locked';
		  if( bool) {
			  document.body.classList.add(bodySrollLockedClassname);
		  } else {
        document.body.classList.remove(bodySrollLockedClassname);
      }
	  }, { immediate: true })
  },

  computed: {
    pages () {
      return this.$page.pages.edges.map((e) => e.node);
    },

    orderedPages () {
      let filteredPages = this.pages.filter((p) => {
        let r = true;
        if (this.checkedGoals.length && p.goal && r) {
          r = this.checkedGoals.includes(p.goal.id)
        }
        
        if (this.checkedGroupSizes.length && r) {
          if (!p.groupSize.length) return;
          r = (p.groupSize.map((g) => g.id).filter(groupId => this.checkedGroupSizes.includes(groupId))).length;
        }

        if (this.checkedLevels.length && r) {
          if (!p.level) return;
          r = this.checkedLevels.includes(p.level.id);
        }

        if (this.checkedTimings.length && r) {
          if (!p.timing) return;
          r = this.checkedTimings.includes(p.timing.id);
        }

        if (this.length.length && r) {
          if (!p.length) return;
          const min = Math.min(...p.length.map((v) => v.minValue));
          const max = Math.max(...p.length.map((v) => v.maxValue));
          const minSelected = this.length[0];
          const maxSelected = this.length[1];
          r = (minSelected <= min && maxSelected >= max) || (minSelected > min && minSelected < max) || (maxSelected < max && maxSelected > min);
        }

        if (this.search !== '' && r) {
          r = p.keywords.join().toLowerCase().indexOf(this.search) > -1
        }
      
        return r
      });
  
      switch (this.order.value) {
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
    
    checkedGroupSizes () {
      return this.groupSizes.filter((g) => g.checked).map((g) => g.id);
    },

    checkedLevels () {
      return this.levels.filter((l) => l.checked).map((l) => l.id);
    },
    
    checkedTimings () {
      return this.timings.filter((t) => t.checked).map((t) => t.id);
    },

    filtersCount () {
      return this.checkedGoals.length + this.checkedGroupSizes.length + this.checkedLevels.length + this.checkedTimings.length;
    },

    resultsCount () {
      return this.orderedPages.length;
    }
  },

  methods: {
    onLengthChange (payload) {
      this.length = payload;
    },

    hideFilters () {
      if (this.$store.state.isSmallWindow) {
        this.filtersVisible = false;
      }
    },

    resetFilters () {
      this.goals = this.goals.map((g) => {
        return {
          ...g,
          checked: false
        }
      })

      this.groupSizes = this.groupSizes.map((g) => {
        return {
          ...g,
          checked: false
        }
      })

      this.levels = this.levels.map((l) => {
        return {
          ...l,
          checked: false
        }
      })

      this.timings = this.timings.map((t) => {
        return {
          ...t,
          checked: false
        }
      })

      this.length = [5, 100]
    }
  }
}
</script>

<style lang="scss">
.inspirations {
  display: flex;
  background: url('../assets/images/list-bg.svg') top center no-repeat;
}

.inspi__filters {
  flex: 0 0 340px;
}

.inspi__list {
  flex: 1;

  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -#{space(3)};
    list-style: none;
    padding: 0;
  }
}

.inspi__card-wrapper {
  padding: space(3);
  width: 50%;

  > .card {
    height: 100%;
  }
}

.flip-list-move {
  transition: transform 0.3s ease;
}

.list__search-and-ordering {
  display: flex;
  margin-bottom: space(6);

  > .input {
      flex: 1;
      margin-right: space(2);
  }
}

.list__count-and-ordering {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: space(6);
}

.list__count {
  font-weight: fw(medium);
  font-size: fs(large);
  color: color(black-light);
}

.list__order {
  .select {
    margin-left: 1rem;
  }
}

@include breakpoint(medium) {
  .inspi__filters {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(color(black-light), 0.6);

    .filters {
      width: 90%;
      height: 100%;
      background: color(white);
      animation: from-left 0.3s ease;
    }
  }

  .inspi__card-wrapper {
    width: 100%;
  }

  .list__search-and-ordering {
    flex-direction: column;

    > .input {
      margin-bottom: space(2);
      margin-right: 0;
    }

    > div {
      display: flex;
      justify-content: space-between;

      > .btn {
        flex: 1;
        margin-right: space(2);
      }
    }
  }
}

@keyframes from-left {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
