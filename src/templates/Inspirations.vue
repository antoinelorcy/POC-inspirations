<template>
	<Layout>
	<div class="inspirations inspi inner-width">
	  <div v-if="!$store.state.isSmallWindow || filtersVisible" class="inspi__filters">
		<Filters
		  v-on-clickaway="hideFilters"
		  :goals="goals"
		  :group-sizes="groupSizes"
		  :levels="levels"
		  :length="length"
		  :timings="timings"
		  :tags="tags"
		  :filters-count="filtersCount"
		  :results-count="resultsCount"
		  @change-length="onLengthChange"
		  @close="filtersVisible = false"
		  @reset="resetFilters"
		/>
	  </div>
	  <div class="inspi__list">
		  <div class="list__search-and-ordering">
			<Input placeholder="Rechercher par mots-clés" icon="search" v-model="search" />
			<div>
			  <Button v-if="$store.state.isSmallWindow" :label="`Filtres (${filtersCount})`" @click="filtersVisible = true" />
			</div>
		  </div>
		  <div class="list__count-and-ordering">
			<div class="list__count">{{ orderedPages.length }} activités</div>
			<div class="list__order">
			  Trier par <Select :value="order" @input="order = $event" :options="orders" value-key="label" close-on-select />
			</div>
		  </div>
		  <div v-if="!orderedPages.length">
			<NoResult />
		  </div>
		  <transition-group v-else name="flip-list" tag="ul">
			<li v-for="page in orderedPages" :key="page.id" class="inspi__card-wrapper">
				<Card
					:locale="$context.locale"
					:thumbnail="page.fields.thumbnail"
					:title="page.title"
					:url="page.url"
					:goal-id="page.goalId"
					:level-id="page.levelId"
					:group-size-ids="page.groupSizeIds"
					:length-ids="page.lengthIds"
					:goal-label="page.fields.goalLabel"
					:added-value="page.fields.addedValue"
					:activity-icon="page.activityIcon"
				/>
			</li>
		  </transition-group>
	  </div>
	</div>

	<SubFooterVideo slot="sub-footer-left" />
	<SubFooterSignup slot="sub-footer-right" />
  </Layout>
</template>

<page-query>
query ($locale: String!) {
	pages: allInspiration (filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				title
				createdAt
				url
				fields {
					thumbnail
					keywords
					goal {sys{id}}
					level{sys{id}}
					timing{sys{id}}
					groupSize{sys{id}}
					length{
						sys {id}
						fields {
							minValue
							maxValue
							value
						}
					}
					tag{sys{id}}
					goalLabel
					addedValue
					activity {
						fields {
							key
							title
						}
					}
				}
			}
		}
	}

	goals: allGoal (sortBy: "order", order: ASC, filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				title
			}
		}
	}

	lengths: allLength (sortBy: "order", order: ASC, filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				value
				minValue
				maxValue
			}
		}
	}

	groupSizes: allGroupSize (sortBy: "order", order: ASC, filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				size
			}
		}
	}

	levels: allLevel (sortBy: "order", order: ASC, filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				level
			}
		}
	}

	timings: allTiming (sortBy: "order", order: ASC, filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				timing
			}
		}
	}

	tags: allTag (sortBy: "order", order: ASC, filter: {locale: { eq: $locale}}) {
		edges {
			node {
				id
				sysId
				locale
				title
			}
		}
	}
}
</page-query>

<script>
import { mixin as clickaway } from "vue-clickaway";
import Card from '~/components/Card';
import Filters from '~/components/Filters';
import SubFooterVideo from '~/components/SubFooterVideo';
import SubFooterSignup from '~/components/SubFooterSignup';
import NoResult from '~/components/NoResult';

export default {
	metaInfo: {
		title: 'Inspirations',
		name: 'inspirations'
	},

	mixins: [clickaway],

	components: {
		Card,
		Filters,
		SubFooterVideo,
		SubFooterSignup,
		NoResult
	},

	data () {
		return {
		goals: [],
		groupSizes: [],
		levels: [],
		timings: [],
		tags: [],
		length: [5, 100],
		search: '',
		order: {},
		orders: [
			{ id: 'date', value: 'date', label: 'Date d\'ajout' },
			{ id: 'name', value: 'name', label: 'Nom de l\'activité' },
			{ id: 'goal', value: 'goal', label: 'Objectif principal' }
		],
		filtersVisible: false
		}
	},

	created () {
		this.$i18n.set(this.$context.locale);
	},

	mounted () {
		this.order = this.orders[0];

		this.goals = this.$page.goals.edges
			.map((g) => {
				return {
					id: g.node.id,
					sysId: g.node.sysId,
					label: g.node.title,
					checked: this.$route.query.goal && this.$route.query.goal === g.node.sysId
				}
			})

		this.groupSizes = this.$page.groupSizes.edges
			.map((g) => {
				return {
					id: g.node.id,
					sysId: g.node.sysId,
					label: g.node.size,
					checked: this.$route.query.groupSize && this.$route.query.groupSize === g.node.sysId
				}
			})

		this.levels = this.$page.levels.edges
			.map((g) => {
				return {
					id: g.node.id,
					sysId: g.node.sysId,
					label: g.node.level,
					checked: false
				}
			})

		this.timings = this.$page.timings.edges
			.map((g) => {
				return {
					id: g.node.id,
					sysId: g.node.sysId,
					label: g.node.timing,
					checked: false
				}
			})

		this.tags = this.$page.tags.edges
			.map((g) => {
				return {
					id: g.node.id,
					sysId: g.node.sysId,
					label: g.node.title,
					checked: false
				}
			})

		if (this.$route.query.goal || this.$route.query.groupSize) {
			this.$router.replace({ query: {}});
		}

		this.$watch('filtersVisible', (bool) => {
			const bodySrollLockedClassname = 'body--is-scroll-locked';
			if( bool) {
				document.body.classList.add(bodySrollLockedClassname);
			} else {
				document.body.classList.remove(bodySrollLockedClassname);
			}
		}, { immediate: true })
	},

  computed: {
	pages () {
		return this.$page.pages.edges.map((edge) => {
			return {
				...edge.node,
				goalId: edge.node.fields.goal.sys.id,
				levelId: edge.node.fields.level.sys.id,
				timingId: edge.node.fields.timing.sys.id,
				groupSizeIds: edge.node.fields.groupSize.map((n) => n.sys.id),
				lengthIds: edge.node.fields.length.map((n) => n.sys.id),
				tagIds: edge.node.fields.tag.map((n) => n.sys.id),
				activityIcon : edge.node.fields.activity.fields.key
			}
		});
	},

	orderedPages () {
	  let filteredPages = this.pages.filter((p) => {
		let r = true;
		if (this.checkedGoals.length && p.fields.goal && r) {
		  r = this.checkedGoals.includes(p.goalId)
		}
		
		if (this.checkedGroupSizes.length && r) {
		  if (!p.groupSizeIds.length) return;
		  r = (p.groupSizeIds.filter(groupId => this.checkedGroupSizes.includes(groupId))).length;
		}

		if (this.checkedLevels.length && r) {
		  if (!p.levelId) return;
		  r = this.checkedLevels.includes(p.levelId);
		}

		if (this.checkedTimings.length && r) {
		  if (!p.timingId) return;
		  r = this.checkedTimings.includes(p.timingId);
		}

		if (this.checkedTags.length && r) {
		  if (!p.tagIds.length) return;
		  r = (p.tagIds.filter(tagId => this.checkedTags.includes(tagId))).length;
		}

		if (this.length.length && r) {
			if (!p.lengthIds.length) return;
			const min = Math.min(...p.fields.length.map((v) => v.fields.minValue));
			const max = Math.max(...p.fields.length.map((v) => v.fields.maxValue));
			const minSelected = this.length[0];
			const maxSelected = this.length[1];
			r = (minSelected <= min && maxSelected >= max) || (minSelected > min && minSelected < max) || (maxSelected < max && maxSelected > min);
		}

		if (this.search !== '' && r) {
		  r = p.fields.keywords.join().toLowerCase().indexOf(this.search) > -1
		}
	  
		return r
	  });
  
	  switch (this.order.value) {
		case 'date':
		  return filteredPages.sort((a, b) => b.createdAt - a.createdAt);
		  break;
		case 'name':
		  return filteredPages.sort((a, b) => a.title.localeCompare(b.title));
		  break;
		case 'goal':
			return filteredPages.sort((a, b) => a.goalId.localeCompare(b.goalId));
			break;
		default:
		  return filteredPages;
	  }
	},

	checkedGoals () {
	  return this.goals.filter((g) => g.checked).map((g) => g.sysId);
	},
	
	checkedGroupSizes () {
	  return this.groupSizes.filter((g) => g.checked).map((g) => g.sysId);
	},

	checkedLevels () {
	  return this.levels.filter((l) => l.checked).map((l) => l.sysId);
	},
	
	checkedTimings () {
	  return this.timings.filter((t) => t.checked).map((t) => t.sysId);
	},

	checkedTags () {
		return this.tags.filter((t) => t.checked).map((t) => t.sysId);
	},

	filtersCount () {
	  return this.checkedGoals.length + this.checkedGroupSizes.length + this.checkedLevels.length + this.checkedTimings.length + this.checkedTags.length;
	},

	resultsCount () {
	  return this.orderedPages.length;
	}
  },

  methods: {
	onLengthChange (payload) {
	  this.length = payload;
	},

	hideFilters () {
	  if (this.$store.state.isSmallWindow) {
		this.filtersVisible = false;
	  }
	},

	resetFilters () {
	  this.goals = this.goals.map((g) => {
		return {
		  ...g,
		  checked: false
		}
	  })

	  this.groupSizes = this.groupSizes.map((g) => {
		return {
		  ...g,
		  checked: false
		}
	  })

	  this.levels = this.levels.map((l) => {
		return {
		  ...l,
		  checked: false
		}
	  })

	  this.timings = this.timings.map((t) => {
		return {
		  ...t,
		  checked: false
		}
	  })

	  this.tags = this.tags.map((t) => {
		return {
		  ...t,
		  checked: false
		}
	  })

	  this.length = [5, 100]
	}
  }
}
</script>

<style lang="scss">
.inspirations {
  display: flex;
  background: url('../assets/images/list-bg.svg') top center no-repeat;

  @include breakpoint(medium) {
	padding: 1rem;
  }
}

.inspi__filters {
  flex: 0 0 340px;
}

.inspi__list {
  flex: 1;

  ul {
	display: flex;
	flex-wrap: wrap;
	margin: 0 -#{space(3)};
	list-style: none;
	padding: 0;
  }
}

.inspi__card-wrapper {
  padding: space(3);
  width: 50%;

  > .card {
	height: 100%;
  }
}

.flip-list-move {
  transition: transform 0.3s ease;
}

.list__search-and-ordering {
  display: flex;
  margin-bottom: space(6);

  > .input {
	  flex: 1;
	  margin-right: space(2);
  }
}

.list__count-and-ordering {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: space(6);
}

.list__count {
  font-weight: fw(medium);
  font-size: fs(large);
  color: color(black-light);
}

.list__order {
  .select {
	margin-left: 1rem;
  }
}

@include breakpoint(medium) {
  .inspi__filters {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(color(black-light), 0.6);

	.filters {
	  width: 90%;
	  height: 100%;
	  background: color(white);
	  animation: from-left 0.3s ease;
	}
  }

  .inspi__card-wrapper {
	width: 100%;
  }

  .list__search-and-ordering {
	flex-direction: column;

	> .input {
	  margin-bottom: space(2);
	  margin-right: 0;
	}

	> div {
	  display: flex;
	  justify-content: space-between;

	  > .btn {
		flex: 1;
		margin-right: space(2);
	  }
	}
  }
}

@keyframes from-left {
  0% {
	transform: translateX(-100%);
	opacity: 0;
  }

  100% {
	transform: translateX(0);
	opacity: 1;
  }
}
</style>
