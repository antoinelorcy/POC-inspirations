<template>
	<div class="home-filter">
    Je souhaite
    <select v-model="goal">
      <option disabled value="">Selectionner un objectif</option>
      <option v-for="option in goals" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </select>
    avec
    <select v-model="groupSize">
      <option disabled value="">Nombre de participants</option>
      <option v-for="option in groupSizes" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </select>
    <button @click="search" :disabled="!goal || !groupSize">Rechercher</button>
	</div>
</template>

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

  groupSizes: allContentfulGroupSize (sortBy: "order", order: ASC ) {
    edges {
      node {
        id
        title
        order
      }
    }
  }
}
</static-query>

<script>
export default {
  data () {
    return {
      goal: undefined,
      groupSize: undefined
    }
  },

  computed: {
    goals () {
      return this.$static.goals.edges.map((g) => {
        return {
          id: g.node.id,
          title: g.node.title
        }
      })
    },

    groupSizes () {
      return this.$static.groupSizes.edges.map((g) => {
        return {
          id: g.node.id,
          title: g.node.title,
          order: g.node.order
        }
      })
    }
  },

  methods: {
    search () {
      this.$router.push({path: '/inspirations', query: {goal: this.goal, groupSize: this.groupSize}});
    }
  }
}
</script>