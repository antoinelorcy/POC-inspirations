<script>
import Spinner from './Spinner';

export default {
	props: {
		label: String,
		icon: String,
		/**
		 * "plain" | "raw"
		 */
		fill: {
			type: String,
			default: "plain",
			validator: prop =>
				["plain", "raw", "hollow"].includes(prop)
		},
		color: {
			type: String,
			default: "primary"
		},
		isLoading: false
	},

	components: {
		Spinner
	}
}
</script>

<template>
	<button
		class="btn"
		:class="[{
			'btn--is-icon': !label
		}, 
			'btn--fill-' + fill,
			'btn--color-' + color
		]"
		@click="$emit('click', $event)"
	>
		<Spinner v-if="isLoading" />
		<template v-else>
			<Icon v-if="icon" :name="icon" />
			{{ label }}
		</template>
	</button>
</template>

<style lang="scss" scoped>
.btn {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    cursor: pointer;
    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    /* Corrects inability to style clickable `input` types in iOS */
    -webkit-appearance: none;

	user-select: none;
	outline: none;
	align-items: center;
	display: inline-flex;
	justify-content: center;
	vertical-align: middle;
	transition: all 0.25s ease-out;
	color: color(white);
	border: 2px solid color(primary);
	border-radius: 5px;
	padding: space(2) space(3);
	font-weight: fw(medium);

	&:hover {
		box-shadow: 2px 2px 0 color(grey-light);
	}

	&[disabled] {
		opacity: 0.3;
		cursor: not-allowed;
		background-color: inherit;
	}

	&:focus {
		outline: none;
	}

	&--is-loading {
		cursor: not-allowed;
	}

	&:not(&--is-icon) > i {
		margin-right: 5px;
	}

	&--is-icon {
		padding: space(2);
	}

	&:not(&--is-icon) {
		min-width: 100px;
	}

	@each $key, $value in $colors {
		&.btn--color-#{$key} {
			background-color: $value;
			border-color: $value;
			
			&:hover,
			&:focus {
				background-color: scale-color($value, $lightness: -40%);
			}

			@if ($key == 'grey-light') {
				color: color(grey);

				&:hover,
				&:focus {
					background-color: scale-color($value, $lightness: -10%);
				}
			}


			&.btn--fill-raw {
				background-color: transparent;
				color: $value;
				border-color: transparent;

				&:hover,
				&:focus {
					background-color: color(grey-lighter);
					box-shadow: none;;
				}
			}

			&.btn--fill-hollow {
				background-color: color(white);
				color: color(primary);
				border: 2px solid color(primary);

				&:hover,
				&:focus {
					background-color: color(grey-lighter);
				}
			}
		}
	}

	> .spinner {
		background-color: transparent;
	}
}
</style>