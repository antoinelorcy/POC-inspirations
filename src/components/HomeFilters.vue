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
  goals: allGoal (sortBy: "order", order: ASC ) {
	edges {
	  node {
		id
		title
		locale
	  }
	}
  }

  groupSizes: allGroupSize (sortBy: "order", order: ASC ) {
	edges {
	  node {
		id
		locale
		size
		order
	  }
	}
  }
}
</static-query>

<script>
export default {
	props: {
		locale: {
			type: String,
			required: true
		}
	},

	data () {
		return {
			goal: {},
			groupSize: {}
		}
	},

	computed: {
		goals () {
			return this.$static.goals.edges
				.filter((g) => g.node.locale === this.$context.locale)
				.map((g) => {
					return {
						id: g.node.id,
						locale: g.node.locale,
						label: g.node.title,
						value: g.node.id
					}
				})
		},

		groupSizes () {
			return this.$static.groupSizes.edges
				.filter((g) => g.node.locale === this.$context.locale)
				.map((g) => {
					return {
						id: g.node.id,
						label: g.node.size,
						value: g.node.id
					}
				})
		}
	},

	methods: {
		search () {
			this.$router.push({path: this.$t('URL.TEMPLATES'), query: {goal: this.goal.value, groupSize: this.groupSize.value}});
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

  @include breakpoint(medium) {
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;

	> div {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  width: 100%;
	  margin-bottom: 15px;

	  > span {
		flex: 0 1 30%;
	  }

	  > .select {
		flex: 0 1 60%;
	  }
	}
  }
}
</style>