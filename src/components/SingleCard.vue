<template>
	<div class="single-card">
		<div v-if="activity" class="sc__activity m--b-2">
			<BorderedIcon><ActivityIcon :name="activity.key" :type="activity.activityType.key" /></BorderedIcon>
			Activité {{ activity.title }}
		</div>

		<div class="sc__info m--b-6">
			<div>
				<Tag icon="stopwatch" :label="lengthName" />
				<Tag icon="people" :label="groupName" />
				<Tag icon="education" :label="levelName" />
				<Tag icon="timing" :label="timing" />
			</div>
		</div>

		<div class="sc__goal-label m--b-6">
			<BorderedIcon><Icon name="rocket" :size="25" /></BorderedIcon>{{ goalLabel }}
		</div>

		<div class="sc__added-value m--b-6">
			<BorderedIcon><Icon name="trophy" :size="25" /></BorderedIcon>{{ addedValue }}
		</div>

		<div class="sc__button text-align--center m--t-5">
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
import BorderedIcon from './BorderedIcon';
import Tag from './Tag';

export default {
	props: {
		activity: Object,
		goal: Object,
		level: Object,
		groupSize: Array,
		length: Array,
		timing: String,
		goalLabel: String,
		addedValue: String
	},

	components: {
		ActivityIcon,
		BorderedIcon,
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
.single-card {
	background: color(white);
	box-shadow: 10px 10px 24px rgba(126, 127, 144, 0.2);
	padding: 2rem;
}

.sc__info {
		position: relative;
		margin-left: 2rem;
		padding-left: 2rem;

	&:before {
		content: '';
		position: absolute;
		left: 0;
		border-radius: 5px;
		background-color: color(grey-lighter);
		width: 4px;
		height: 100%;
		display: block;
	}

	.tag {
		display: flex;
	}
}

.sc__goal-label,
.sc__added-value,
.sc__activity {
	display: flex;
	align-items: flex-start;

	> .bordered-icon {
		flex: 0 0 45px;
		margin-right: 1rem;
	}
}

.sc__activity {
	font-weight: fw(medium);
	align-items: center;
}
</style>