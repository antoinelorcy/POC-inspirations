<template>
	<Layout>
    <div class="inspirations">
      <div class="i__left">
        <div class="m--b-5">
          <h2>Filtres <small v-if="filtersCount">({{ filtersCount }})</small></h2>
        </div>

        <div class="m--b-5">
          <h3>Objectifs</h3>
          <Checkbox
            v-for="goal in goals"
            :key="goal.id"
            :label="goal.label"
            v-model="goal.checked"
          />
        </div>

        <div class="m--b-5">
          <h3>Taille du groupe</h3>
          <Checkbox
            v-for="group in groupSizes"
            :key="group.id"
            :label="group.label"
            v-model="group.checked"
          />
        </div>

        <div class="m--b-5">
          <h3>Niveau d'animation</h3>
          <Checkbox
            v-for="level in levels"
            :key="level.id"
            :label="level.label"
            v-model="level.checked"
          />
        </div>

        <div class="m--b-5">
          <h3>Durée de l'activité <small>(en minutes)</small></h3>
          <div class="length-slider-wrapper">
            <vue-slider
              class="length-slider"
              v-model="length"
              :enable-cross="false"
              :min="minLength"
              :max="maxLength"
              :data="labelLengths"
              :marks="true"
            ></vue-slider>
            </div>
        </div>

        <div class="m--b-5">
          <h3>Phase du déroulé</h3>
          <Checkbox
            v-for="timing in timings"
            :key="timing.id"
            :label="timing.label"
            v-model="timing.checked"
          />
        </div>


        <!-- <h3>Groupes</h3>
        <div>
          <input type="radio" name="group" id="group0" value="" v-model="checkedGroupSizes" />
          <label for="group0">Tous</label>
        </div>
        <div v-for="g in groupSizes" :key="g.id">
          <input type="radio" name="group" :id="g.id" :value="g.id" v-model="checkedGroupSizes" />
          <label :for="g.id">{{ g.title }}</label>
        </div> -->
      </div>
    <div class="i__right">
        <div class="list__search-and-ordering">
          <Input placeholder="Rechercher par mots-clés" icon="search" v-model="search" />
          <Select :value="order" @input="order = $event" :options="orders" value-key="label" />
        </div>
        <div v-if="!orderedPages.length">:(</div>
        <transition-group v-else name="flip-list" tag="ul">
          <li v-for="page in orderedPages" :key="page.id" class="i__card-wrapper">
            <Card
              :thumbnail="page.thumbnail.file.url"
              :title="page.title"
              :path="page.path"
              :goal="page.goal"
              :level="page.level"
              :group-size="page.groupSize"
              :length="page.length"
            />
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
          sliderValue
          sliderLabel
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
        sliderLabel
        sliderValue
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
import Card from '~/components/Card';
import Filters from '~/components/Filters';
import VueSlider from 'vue-slider-component';

export default {
  metaInfo: {
    title: 'Inspirations',
    name: 'inspirations'
  },

  components: {
    Card,
    Filters,
    VueSlider
  },

  data () {
    return {
      goals: [],
      groupSizes: [],
      valueLengths: [],
      labelLengths: [],
      levels: [],
      timings: [],
      length: ['5\'', '60\''],
      search: '',
      order: {},
      orders: [
        { id: 'date', value: 'date', label: 'Par date' },
        { id: 'name', value: 'name', label: 'Par nom' }
      ]
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

    this.labelLengths = this.$static.lengths.edges.map((l) => l.node.sliderLabel);
    this.valueLengths = this.$static.lengths.edges.map((l) => l.node.sliderValue);

    // this.$router.replace({ query: {}});
  },

  methods: {
    findMinMaxLength(arr) {
      let min = parseInt(arr[0].sliderValue), max = parseInt(arr[0].sliderValue);

      for (let i = 1, len=arr.length; i < len; i++) {
        let v = parseInt(arr[i].sliderValue);
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
      }

      return [min, max];
    }
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

        // console.log(this.sliderValue);

        if (this.sliderValue.length && r) {
          if (!p.length) return;
          let rangeLength = this.findMinMaxLength(p.length);
          r = rangeLength[0] >= this.sliderValue[0] && rangeLength[1] <= this.sliderValue[1];
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

    minLength () {
      return parseInt(this.valueLengths[0]);
    },

    maxLength () {
      return parseInt(this.valueLengths[this.valueLengths.length - 1]);
    },

    sliderValue () {
      return [parseInt(this.valueLengths[this.labelLengths.indexOf(this.length[0])]), parseInt(this.valueLengths[this.labelLengths.indexOf(this.length[1])])];
    }
  }
}
</script>

<style lang="scss">
/* Set the theme color of the component */
$themeColor: color(primary);

/* import theme style */
@import 'vue-slider-component/lib/theme/default.scss';

.inspirations {
  display: flex;
}

.i__left {
  flex: 0 0 340px;
}

.i__right {
  flex: 1;
}

.i__right ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -#{space(3)};
  list-style: none;
  padding: 0;
}

.i__card-wrapper {
  padding: space(3);
  width: 25%;
}

.flip-list-move {
  transition: transform 0.3s ease;
}

.list__search-and-ordering {
  display: flex;
  margin-bottom: space(4);

  > .input {
      flex: 1;
      margin-right: space(2);
  }
}

.length-slider {
  max-width: 200px;
}

.length-slider-wrapper {
  height: 40px;
  padding: 0 space(2);
}
</style>
