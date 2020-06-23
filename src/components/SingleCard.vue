<template>
	<div class="single-card">
		<div v-if="activity" class="sc__activity m--b-2">
			<BorderedIcon><ActivityIcon :name="activity.key" :type="activity.activityType.fields.key" /></BorderedIcon>
			Activité {{ activity.title }}
		</div>

		<div class="sc__info m--b-6">
			<div>
				<Tag icon="stopwatch" :label="lengthName" />
				<Tag icon="people" :label="groupName" />
				<Tag icon="education" :label="levelName" />
				<Tag icon="timing" :label="timingName" />
			</div>
		</div>

		<div class="sc__goal-label m--b-6">
			<BorderedIcon><Icon name="rocket" :size="25" /></BorderedIcon>{{ goalLabel }}
		</div>

		<div class="sc__added-value m--b-6">
			<BorderedIcon><Icon name="trophy" :size="25" /></BorderedIcon>{{ addedValue }}
		</div>

		<div class="sc__button text-align--center m--t-5 m--b-3 hide-sm">
			<Button label="Utiliser ce modèle" color="primary" />
		</div>

		<div class="sc__social">
			<a
				:href="shareLinkedinUrl"
				target="_blank"
				rel="noopener"
				:aria-label="$t('SHARE.LINKEDIN')"
				@click.prevent="share(shareLinkedinUrl)"
			>
				<g-image src="~/assets/images/social-grey-linkedin.svg" width="30" />
			</a>
			<a
				:href="shareFacebookUrl"
				target="_blank"
				rel="noopener"
				:aria-label="$t('SHARE.FACEBOOK')"
				@click.prevent="share(shareFacebookUrl)"
			>
				<g-image src="~/assets/images/social-grey-facebook.svg" width="30" />
			</a>
			<a
				:href="shareTwitterUrl"
				target="_blank"
				rel="noopener"
				:aria-label="$t('SHARE.TWITTER')"
				@click.prevent="share(shareTwitterUrl)"
			>
				<g-image src="~/assets/images/social-grey-twitter.svg" width="30" />
			</a>
		</div>
	</div>
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

	timings: allTiming (sortBy: "order", order: ASC) {
		edges {
			node {
				id
				sysId
				locale
				timing
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
		locale: String,
		activity: Object,
		goalId: String,
		levelId: String,
		timingId: String,
		groupSizeIds: Array,
		lengthIds: Array,
		goalLabel: String,
		addedValue: String
	},

	components: {
		ActivityIcon,
		BorderedIcon,
		Tag
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

		timingName () {
			const q = this.$static.timings.edges
				.filter((g) => g.node.locale === this.locale)
				.find((g) => g.node.sysId === this.timingId);
			return q.node.timing;
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
		},

		shareUrl () {
			if (!process.isClient) {
				return 'https://www.beekast.com';
			}

			return encodeURI(window.location.href);
		},

		shareFacebookUrl () {
			return `https://facebook.com/sharer/sharer.php?u=${this.shareUrl}`;
		},

		shareLinkedinUrl () {
			return `https://www.linkedin.com/sharing/share-offsite/?url=${this.shareUrl}`;
		},

		shareTwitterUrl () {
			return `https://twitter.com/intent/tweet?url=${this.shareUrl}`;
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
		},

		share (url) {
			window.open(url,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350');
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

.sc__social {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 2rem;
	margin-top: 2rem;
	border-top: 1px dashed color(grey-light);

	> a {
		margin: 0 1.5rem;
	}
}
</style>