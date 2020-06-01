<template>
	<div class="collapse">
		<component :is="isEnable ? 'button' : 'div'" class="collapse__header" @click="$emit('input', !value)">
			<slot name="header" />
			<div v-if="isEnable" class="collapse__icon" :class="{'collapse__icon--rotated': !value}">
				<Icon name="arrow-up" />
			</div>
		</component>
		<transition name="collapse-transition">
			<div v-show="!isEnable || value" class="collapse__content">
				<slot name="content" />
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
		isEnable: Boolean
	}
}
</script>

<style lang="scss" scoped>
.collapse__header {
	display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0;
	-webkit-appearance: none;
	outline: none;
	border: none;
	background-color: transparent;
}

.collapse__icon {
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
	color: color(grey);

	&--rotated {
		transform: rotate(180deg);
	}
}

.collapse-transition-enter-active,
.collapse-transition-leave-active {
  transition: all .3s;
  overflow: hidden;
}
.collapse-transition-enter,
.collapse-transition-leave-to {
  height: 0;
  opacity: 0;
}
</style>