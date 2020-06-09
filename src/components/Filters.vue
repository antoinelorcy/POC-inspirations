<template>
	<div class="filters">
		<div class="f__header m--b-5">
			<div class="display-flex align-center">
				<h2 class="m--b-0 m--r-2">
					Filtres 
					<b v-if="filtersCount">({{ filtersCount }})</b>
				</h2>
				<template v-if="filtersCount">
					<Link
						v-if="!$store.state.isSmallWindow"
						icon="reset"
						label="Réinitialiser"
						color="black"
						is-underline
						@click="$emit('reset')" />
				</template>
			</div>
			<Button v-if="$store.state.isSmallWindow" fill="raw" icon="close" @click="$emit('close')" />
		</div>

		<div class="f__content">
			<Collapse v-model="goalsExpanded" :is-enable="$store.state.isSmallWindow">
				<template #header>
					<h3>Objectifs <Notification v-if="$store.state.isSmallWindow && goalsChecked.length" :count="goalsChecked.length" /></h3>
				</template>
				<template #content>
					<Checkbox
						v-for="goal in goals"
						:key="goal.id"
						:label="goal.label"
						v-model="goal.checked"
					/>
				</template>
			</Collapse>

			<Collapse v-model="groupSizesExpanded" :is-enable="$store.state.isSmallWindow">
				<template #header>
					<h3>Taille du groupe <Notification v-if="$store.state.isSmallWindow && groupSizesChecked.length" :count="groupSizesChecked.length" /></h3>
				</template>
				<template #content>
					<Checkbox
					v-for="group in groupSizes"
					:key="group.id"
					:label="group.label"
					v-model="group.checked"
				/>
				</template>
			</Collapse>

			<Collapse v-model="levelsExpanded" :is-enable="$store.state.isSmallWindow">
				<template #header>
					<h3>Niveau d'animation <Notification v-if="$store.state.isSmallWindow && levelsChecked.length" :count="levelsChecked.length" /></h3>
				</template>
				<template #content>
					<Checkbox
						v-for="level in levels"
						:key="level.id"
						:label="level.label"
						v-model="level.checked"
					/>
				</template>
			</Collapse>

			<div class="m--b-6">
				<h3>Durée de l'activité <small>(en minutes)</small></h3>
				<div class="length-slider-wrapper">
					<ClientOnly>
						<vue-slider
							class="length-slider"
							:value="length"
							@change="$emit('change-length', $event)"
							:enable-cross="false"
							:min="5"
							:max="100"
							:min-range="1"
							:data="[5, 10, 20, 30, 40, 50, 60, 100]"
							:tooltip="'always'"
							:tooltip-placement="'top'"
							:tooltip-formatter="sliderTooltipFormatter"
						></vue-slider>
					</ClientOnly>
				</div>
			</div>

			<Collapse v-model="timingsExpanded" :is-enable="$store.state.isSmallWindow">
				<template #header>
					<h3>Phase du déroulé <Notification v-if="$store.state.isSmallWindow && timingsChecked.length" :count="timingsChecked.length" /></h3>
				</template>
				<template #content>
					<Checkbox
						v-for="timing in timings"
						:key="timing.id"
						:label="timing.label"
						v-model="timing.checked"
					/>
				</template>
			</Collapse>
		</div>

		<div v-if="$store.state.isSmallWindow" class="f__footer">
			<div class="f__footer-counter">
				<b>{{ resultsCount }}</b> modèles - <b>{{ filtersCount }}</b> filtres activés
			</div>
			<div class="f__footer-btns">
				<Link
					v-if="filtersCount"
					icon="reset"
					label="Réinitialiser"
					color="black"
					@click="$emit('reset')"
				/>
				<Button label="Appliquer les filtres" @click="$emit('close')" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		goals: Array,
		groupSizes: Array,
		levels: Array,
		length: Array,
		timings: Array,
		filtersCount: Number,
		resultsCount: Number
	},

	components: {
		VueSlider: () => import('vue-slider-component')
	},

	data () {
		return {
			goalsExpanded: false,
			groupSizesExpanded: false,
			levelsExpanded: false,
			timingsExpanded: false,
			sliderTooltipFormatter: (v) => {
				if (v > 60) return '60+';
				else return v + '\'';
			}
		}
	},

	computed: {
		goalsChecked () {
			return this.goals.filter((g) => g.checked);
		},

		groupSizesChecked () {
			return this.groupSizes.filter((g) => g.checked);
		},

		levelsChecked () {
			return this.levels.filter((g) => g.checked);
		},

		timingsChecked () {
			return this.timings.filter((g) => g.checked);
		}
	}
}
</script>

<style lang="scss">
/* Set the theme color of the component */
$themeColor: color(primary);

/* import theme style */
@import 'vue-slider-component/lib/theme/default.scss';

.length-slider {
	max-width: 250px;
}

.length-slider-wrapper {
	height: 50px;
  padding: 30px 8px 0;
}

.vue-slider-dot-tooltip-inner {
	background-color: transparent;
  color: color(grey);

  &::after {
	  display: none;
  }
}

.vue-slider-dot-handle {
	border: 3px solid color(primary);
  box-shadow: none;
}

.f__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 45px;

	h2 {
		display: flex;
		align-items: center;

		&:before {
			content: '';
			background: url('../assets/images/shape-orange.svg') center center no-repeat;
			background-size: contain;
			width: 13px;
			height: 13px;
			display: inline-block;
			margin-right: 1rem;
		}

		> b {
			color: color(primary);
			font-size: fs(large);
			margin-left: 0.5rem;
		}
	}

}

.f__content {
	h3 {
		&:after {
			content: '';
			display: block;
			background: #D0CAE1;
			border-radius: 5px;
			width: 30px;
			height: 3px;
			margin-top: 10px;
		}
	}
}

.collapse {
	margin-bottom: space(3);
	padding-bottom: space(3);
}

.collapse__header {
	padding: 1rem 0 !important;

	> h3 {
		margin: 0;
	}

	.notification {
		margin-left: space(1);
	}
}

@include breakpoint(medium) {
	.filters {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}

	.f__header {
		background-color: color(grey-lighter);
		margin: 0 !important;
		padding: space(2);

		h2 {
			margin: 0;
		}
	}

	.f__content {
		h3 {
			&:after {
				display: none;
			}
		}
	}

	.f__footer {
		background-color: color(grey-lighter);
		padding: space(2);
	}

	.f__footer-counter {
		padding: space(2);
		text-align: center;
	}

	.f__footer-btns {
		display: flex;
		justify-content: space-around;
	}

	.f__content {
		@include overflow(vertical);

		flex: 1;
		overflow: auto;
		padding: space(3);
	}

	.collapse {
		&:not(:last-child) {
			border-bottom: 1px solid color(grey-lighter);
		}
	}
}
</style>