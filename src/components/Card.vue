<template>
	<g-link class="card" :to="url">
		<h4 class="card__title">{{ title }}</h4>
		<div class="card__goal">{{ goalName }}</div>
		<div class="card__cover">
			<g-image :src="thumbnail" width="250" />
			<BorderedIcon><ActivityIcon v-if="activityIcon" :name="activityIcon" /></BorderedIcon>
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
	goals: allGoal (sortBy: "order", order: ASC) {
		edges {
			node {
				id
				locale
				sysId
				title
			}
		}
	}

	lengths: allLength (sortBy: "order", order: ASC ) {
		edges {
			node {
				id
				locale
				sysId
				value
				order
				minValue
				maxValue
			}
		}
	}

	groupSizes: allGroupSize (sortBy: "order", order: ASC ) {
		edges {
			node {
				id
				locale
				sysId
				size
				order
				minValue
				maxValue
			}
		}
	}

	levels: allLevel (sortBy: "order", order: ASC) {
		edges {
			node {
				id
				locale
				sysId
				level
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
		locale: String,
		title: String,
		thumbnail: String,
		url: String,
		goalId: String,
		levelId: String,
		groupSizeIds: Array,
		lengthIds: Array,
		goalLabel: String,
		addedValue: String,
		activityIcon: String
	},

	computed: {
		goalName () {
			const q = this.$static.goals.edges
				.filter((g) => g.node.locale === this.locale)
				.find((g) => g.node.sysId === this.goalId);
			return q.node.title;
		},

		levelName () {
			const q = this.$static.levels.edges
				.filter((g) => g.node.locale === this.locale)
				.find((g) => g.node.sysId === this.levelId);
			return q.node.level;
		},

		groupName () {
			const groupSizesLocale = this.$static.groupSizes.edges.filter((g) => g.node.locale === this.locale);
			if (this.groupSizeIds.length === groupSizesLocale.length) {
				return 'Tout groupe';
			} else if (this.groupSizeIds.length > 1) {
				const q = groupSizesLocale
					.filter((gz) => this.groupSizeIds.includes(gz.node.sysId))
					.map((r) => r.node);
				const rangeGroupOrder = this.findMinMaxGroupSize(q);
				const minGroup = q.find((g) => g.order === rangeGroupOrder[0]);
				const maxGroup = q.find((g) => g.order === rangeGroupOrder[1]);
				return minGroup.minValue + ' à ' + maxGroup.maxValue;
			}

			const q = groupSizesLocale.find((g) => g.node.sysId === this.groupSizeIds[0]);
			return q.node.size;
		},

		lengthName () {
			const lengthsLocale = this.$static.lengths.edges.filter((g) => g.node.locale === this.locale);
			if (this.lengthIds.length > 1) {
				const q = lengthsLocale.filter((gz) => this.lengthIds.includes(gz.node.sysId)).map((r) => r.node);
				const rangeGroupOrder = this.findMinMaxGroupSize(q);
				const minGroup = q.find((g) => g.order === rangeGroupOrder[0]);
				const maxGroup = q.find((g) => g.order === rangeGroupOrder[1]);
				return minGroup.minValue + ' à ' + (maxGroup.maxValue > 60 ? '60 min et plus' : maxGroup.maxValue + 'min');
			}

			const q = lengthsLocale.find((g) => g.node.sysId === this.lengthIds[0]);
			return q.node.value;
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