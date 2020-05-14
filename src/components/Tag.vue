<template>
	<div class="tag">
		<Icon v-if="icon" :name="icon" /> {{ label }}
	</div>
</template>

<script>
export default {
	props: {
		label: String,
		icon: String
	}
}
</script>

<style lang="scss" scoped>
.tag {
	display: inline-flex;
	font-size: 12px;
	align-items: center;
	vertical-align: middle;
	background: color(grey-lighter);
	color: color(grey);
	padding: 5px 6px;
	border-radius: 3px;

	> .icon {
		margin-right: space(1);
	}
}
</style>