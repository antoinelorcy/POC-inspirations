<script>
export default {
	props: {
		label: String,
		icon: String,
		to: String,
		color: {
			type: String,
			default: 'primary'
		},
		isBold: Boolean,
		isIconPrefix: Boolean
	}
}
</script>

<template>
	<g-link
		:to="to"
		class="link"
		:class="['link--color-' + color, {'link--bold': isBold}]"
		@click.native="$emit('click')"
	>
		<Icon v-if="icon && isIconPrefix" :name="icon" />
		<span>{{ label }}</span>
		<Icon v-if="icon && !isIconPrefix" :name="icon" />
	</g-link>
</template>

<style lang="scss">
.link {
	cursor: pointer;
	text-decoration: none;
	border: 2px solid transparent;
	padding: space(2) 0;
	user-select: none;
	outline: none;
	align-items: center;
	display: inline-flex;
	justify-content: center;
	position: relative;
	min-width: 8rem;
	text-decoration: none;
	color: color(primary);
	padding: space(2);
	border-radius: 5px;
	transition: all 0.25s ease-out;

	&--bold {
		font-weight: bold;
	}

	&--color-danger {
		color: color(danger);
	}

	&:hover {
		background: color(grey-lighter);
	}

	> span + .icon,
	> .icon + span {
		margin-left: space(2);
	}
}
</style>