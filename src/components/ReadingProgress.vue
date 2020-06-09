<template>
	<div class="reading-progress">
		<span :style="{width: (progressValue * 100) + '%'}"></span>
	</div>
</template>

<script>
import { throttle } from 'lodash-es';

export default {
	data () {
		return {
			progressValue: 0
		};
	},

	mounted () {
		document.addEventListener('scroll', this.throttleScroll);
	},

	methods: {
		throttleScroll: throttle(function () {
				this.scroll();
		}, 30),

		scroll () {
			const $page = document.documentElement;
			const scrollHeight = $page.scrollHeight - $page.clientHeight;
			const scrollPosition = $page.scrollTop;
			this.progressValue = scrollPosition / scrollHeight;
		}
	}
}
</script>

<style lang="scss" scoped>
.reading-progress {
	width: 100%;
	background: #eee;
	height: 5px;

	> span {
		background-color: color(primary);
		display: block;
		transition: width 0.3s ease;
		height: 100%;
	}
}
</style>