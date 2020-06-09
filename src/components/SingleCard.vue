<template>
	<div class="page-card">
		<div v-if="activity" class="pc__activity m--b-2">
			<ActivityIcon :name="activity.key" :type="activity.activityType.key" />
			Activité {{ activity.title }}
		</div>

		<div class="pc__info m--b-2">
			<Tag icon="stopwatch" :label="lengthName" />
			<Tag icon="people" :label="groupName" />
			<Tag icon="education" :label="levelName" />
		</div>

		<div class="pc__goal-label m--b-2">
			{{ goalLabel }}
		</div>

		<div class="pc__added-value m--b-2">
			{{ addedValue }}
		</div>

		<div class="pc__button text-align--center m--t-5">
			<Button label="Utiliser ce modèle" color="primary" />
		</div>
	</div>
</template>

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
		order
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
		order
		minValue
		maxValue
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
}
</static-query>

<script>
import ActivityIcon from './ActivityIcon';
import Tag from './Tag';

export default {
	props: {
		activity: Object,
		goal: Object,
		level: Object,
		groupSize: Array,
		length: Array,
		goalLabel: String,
		addedValue: String
	},

	components: {
		ActivityIcon,
		Tag
	},

	computed: {
		levelName () {
			const q = this.$static.levels.edges.find((g) => g.node.id === this.level.id);
			return q.node.title;
		},

		groupName () {
			if (this.groupSize.length === this.$static.groupSizes.edges.length) {
				return 'Tout groupe';
			} else if (this.groupSize.length > 1) {
				const q = this.$static.groupSizes.edges.filter((gz) => this.groupSize.map((g) => g.id).includes(gz.node.id)).map((r) => r.node);
				const rangeGroupOrder = this.findMinMaxGroupSize(q);
				const minGroup = q.find((g) => g.order === rangeGroupOrder[0]);
				const maxGroup = q.find((g) => g.order === rangeGroupOrder[1]);
				return minGroup.minValue + ' à ' + maxGroup.maxValue;
			}

			const q = this.$static.groupSizes.edges.find((g) => g.node.id === this.groupSize[0].id);
			return q.node.title;
		},

		lengthName () {
			if (this.length.length > 1) {
				const q = this.$static.lengths.edges.filter((gz) => this.length.map((g) => g.id).includes(gz.node.id)).map((r) => r.node);
				const rangeGroupOrder = this.findMinMaxGroupSize(q);
				const minGroup = q.find((g) => g.order === rangeGroupOrder[0]);
				const maxGroup = q.find((g) => g.order === rangeGroupOrder[1]);
				return minGroup.minValue + ' à ' + (maxGroup.maxValue > 60 ? '60 min et plus' : maxGroup.maxValue + 'min');
			}

			const q = this.$static.lengths.edges.find((g) => g.node.id === this.length[0].id);
			return q.node.title;
		}
	},

	methods: {
		findMinMaxGroupSize(arr) {
			let min = parseInt(arr[0].order), max = parseInt(arr[0].order);

			for (let i = 1, len=arr.length; i < len; i++) {
				let v = parseInt(arr[i].order);
				min = (v < min) ? v : min;
				max = (v > max) ? v : max;
			}

			return [min, max];
		}
	}
}
</script>

<style lang="scss" scoped>
.page-card {
	background: color(white);
	box-shadow: 10px 10px 24px rgba(126, 127, 144, 0.2);
	padding: 2rem;
}

.pc__activity {
	display: flex;
	align-items: center;
	font-weight: fw(medium);

	> .activity-icon {
		margin-right: 1rem;
	}
}

.pc__info {
	> .tag {
		display: flex;
	}
}
</style>