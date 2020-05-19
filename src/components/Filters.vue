<template>
	<div class="filters">
		<div class="f__header m--b-5">
			<div class="display-flex align-center">
				<h2 class="m--b-0 m--r-2">
					Filtres 
				</h2>
				<template v-if="filtersCount">
					<b v-if="filtersCount">({{ filtersCount }})</b>
					<Link v-if="!$store.state.isSmallWindow" label="Réinitialiser les filtres" color="danger" @click="$emit('reset')" />
				</template>
			</div>
			<Button v-if="$store.state.isSmallWindow" fill="raw" icon="close" @click="$emit('close')" />
		</div>

		<div class="f__content">
			<div class="m--b-5">
				<h3>Objectifs</h3>
				<Checkbox
					v-for="goal in goals"
					:key="goal.id"
					:label="goal.label"
					v-model="goal.checked"
				/>
			</div>

			<div class="m--b-5">
				<h3>Taille du groupe</h3>
				<Checkbox
					v-for="group in groupSizes"
					:key="group.id"
					:label="group.label"
					v-model="group.checked"
				/>
			</div>

			<div class="m--b-5">
				<h3>Niveau d'animation</h3>
				<Checkbox
					v-for="level in levels"
					:key="level.id"
					:label="level.label"
					v-model="level.checked"
				/>
			</div>

			<div class="m--b-5">
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

			<div class="m--b-5">
				<h3>Phase du déroulé</h3>
				<Checkbox
					v-for="timing in timings"
					:key="timing.id"
					:label="timing.label"
					v-model="timing.checked"
				/>
			</div>
		</div>

		<div v-if="$store.state.isSmallWindow" class="f__footer">
			<div class="f__footer-counter">
				<b>{{ resultsCount }}</b> modèles - <b>{{ filtersCount }}</b> filtres activés
			</div>
			<div class="f__footer-btns">
				<Link v-if="filtersCount" label="Réinitialiser" color="danger" @click="$emit('reset')" />
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
			sliderTooltipFormatter: (v) => {
				if (v > 60) return '60+';
				else return v + '\'';
			}
		}
	}
}
</script>

<style lang="scss">
.f__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 40px;
}

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
}
</style>