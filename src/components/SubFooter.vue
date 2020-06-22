<template>
	<section class="sub-footer">
		<div class="inner-width sub-footer__inner">
			<div v-if="$slots['left']" class="sub-footer__left">
				<slot name="left" />
			</div>
			<div v-if="$slots['right']" class="sub-footer__right">
				<slot name="right" />
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.sub-footer {
	background-color: #FBFAFC;
	padding: 60px 0;

	@include breakpoint(medium) {
		padding: 30px 0;
	}
}

.sub-footer__inner {
	display: flex;

	@include breakpoint(medium) {
		flex-direction: column;
	}
}

.sub-footer__left,
.sub-footer__right {
	flex: 1 1 50%;
	padding: 2rem;
}
</style>