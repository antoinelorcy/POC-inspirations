<template>
	<g-link class="card" :to="path">
		<h4 class="card__title">{{ title }}</h4>
		<div class="card__goal">{{ goalName }}</div>
		<div class="card__cover">
			<g-image :src="thumbnail" width="250" />
			<ActivityIcon :name="activityIcon" :type="activityType" />
		</div>
		<div class="card__goal-label">{{ goalLabel }}</div>
		<div class="card__added-value">{{ addedValue }}</div>
		<div class="tags">
			<Tag icon="education" :label="levelName" />
			<Tag icon="people" :label="groupName" />
			<Tag icon="stopwatch" :label="lengthName" />
		</div>
	</g-link>
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
import Tag from './Tag';
import ActivityIcon from './ActivityIcon';

export default {
	components: {
		Tag,
		ActivityIcon
	},

	props: {
		title: String,
		thumbnail: String,
		path: String,
		goal: Object,
		level: Object,
		groupSize: Array,
		length: Array,
		goalLabel: String,
		addedValue: String,
		activityIcon: String,
		activityType: String
	},

	computed: {
		goalName () {
			const q = this.$static.goals.edges.find((g) => g.node.id === this.goal.id);
			return q.node.title;
		},

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
.card {
	text-decoration: none;
	color: #343434;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	padding: space(4);

	.tag {
		margin: space(1);
	}
}

.card__title {
	margin: 0;
	color: color(grey);
}

.card__goal {
	color: color(primary);
	font-size: 12px;
	margin-bottom: space(2);
}

.card__cover {
	position: relative;

	> img {
		width: 100%;
		height: 200px;
		overflow: hidden;
		object-fit: cover;
		border-radius: 5px;
		margin-bottom: space(2);
	}

	> .activity-icon {
		position: absolute;
		bottom: -5px;
		right: 20px;
		background: white;
		box-shadow: 0 0 0 5px white;
	}
}

@include breakpoint(medium) {
	.card > img {
		width: 100%;
	}
}
</style>