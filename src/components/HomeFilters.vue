<template>
	<div class="home-filters">
    <div>
      <span>Je souhaite</span>
      <Select
        v-model="goal"
        value-key="label"
        :options="goals"
        placeholder="Selectionner un objectif"
      />
    </div>
    <div>
      <span>avec</span>
      <Select
        v-model="groupSize"
        value-key="label"
        :options="groupSizes"
        placeholder="Nombre de participants"
      />
    </div>
    <Button @click="search" :disabled="!goal.value || !groupSize.value" label="Rechercher" />
	</div>
</template>

<static-query>
query {
  goals: allContentfulGoal (sortBy: "order", order: ASC ) {
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
      goal: {},
      groupSize: {}
    }
  },

  computed: {
    goals () {
      return this.$static.goals.edges.map((g) => {
        return {
          id: g.node.id,
          label: g.node.title,
          value: g.node.id
        }
      })
    },

    groupSizes () {
      return this.$static.groupSizes.edges.map((g) => {
        return {
          id: g.node.id,
          label: g.node.title,
          value: g.node.id
        }
      })
    }
  },

  methods: {
    search () {
      this.$router.push({path: '/inspirations', query: {goal: this.goal.value, groupSize: this.groupSize.value}});
    }
  }
}
</script>

<style lang="scss" scoped>
.home-filters {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 850px;
  margin: auto;

  > div > span {
    font-family: $ff2;
    font-size: 2rem;
    margin-right: 10px;
  }

  .select {
    width: 230px;
  }
}
</style>