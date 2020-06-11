<template>
	<g-link class="card" :to="path">
		<h4 class="card__title">{{ title }}</h4>
		<div class="card__goal">{{ goalName }}</div>
		<div class="card__cover">
			<g-image :src="thumbnail" width="250" />
			<BorderedIcon><ActivityIcon v-if="activityIcon" :name="activityIcon" :type="activityType" /></BorderedIcon>
		</div>
		<div v-if="goalLabel" class="card__goal-label">
			<BorderedIcon><Icon name="rocket" :size="20" /></BorderedIcon> {{ goalLabel }}
		</div>
		<div v-if="addedValue" class="card__added-value">
			<BorderedIcon><Icon name="trophy" :size="20" /></BorderedIcon> {{ addedValue }}
		</div>
		<div class="card__tags">
			<div class="card__tags-inner">
				<Tag icon="stopwatch" :label="lengthName" />
				<Tag icon="people" :label="groupName" />
				<Tag icon="education" :label="levelName" />
			</div>
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
import BorderedIcon from './BorderedIcon';

export default {
	components: {
		Tag,
		ActivityIcon,
		BorderedIcon
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
	background: color(white);
	text-decoration: none;
	color: #343434;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	padding: space(4);
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
	}

	.tag {
		margin: space(1);
	}
}

.card__title {
	margin: 0;
	margin-bottom: space(1);
	color: color(grey);
	font-size: fs(large);
}

.card__goal {
	color: color(primary);
	font-size: 12px;
	margin-bottom: space(2);
}

.card__cover {
	position: relative;
	margin-bottom: space(4);

	> img {
		width: 100%;
		height: 200px;
		overflow: hidden;
		object-fit: cover;
	}

	> .bordered-icon {
		position: absolute;
		bottom: -10px;
		right: 4px;
		background: white;
		box-shadow: 0 0 0 5px white;
	}
}

.card__goal-label {
	display: flex;
	align-items: center;
	padding: 1rem 0;
	font-weight: fw(medium);
	color: $body-font-color;

	> .bordered-icon {
		flex-shrink: 0;
		margin-right: 1rem;
	}
}

.card__added-value {
	padding: 1rem 0;
	color: $body-font-color;
	font-style: italic;
	display: flex;
	align-items: center;

	> .bordered-icon {
		flex-shrink: 0;
		margin-right: 1rem;
	}
}

.card__tags {
	margin-top: auto;

	&:before {
		content: '';
		width: 80%;
		height: 3px;
		background-color: color(grey-lighter);
		display: block;
		margin: 1rem auto;
	}
}

.card__tags-inner {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

@include breakpoint(medium) {
	.card > img {
		width: 100%;
	}
}
</style>