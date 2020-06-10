<template>
	<span class="bordered-icon">
		<slot></slot>
	</span>
</template>

<style lang="scss" scoped>
$bordered-icon-size: 45px;

.bordered-icon {
	position: relative;
	width: $bordered-icon-size;
	height: $bordered-icon-size;
	border-radius: $bordered-icon-size;
	border: 1px dashed color(grey-light);
	display: inline-flex;
	align-items: center;
	justify-content: center;

	&:before {
		content: '';
		background: url('../assets/images/shape-3.svg') center center no-repeat;
		background-size: contain;
		width: 25px;
		height: 25px;
		position: absolute;
		bottom: -1px;
		left: -10px;
	}
}
</style>