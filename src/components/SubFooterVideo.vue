<script>
import SubFooterCard from './SubFooterCard';
import VideoModal from './VideoModal';

export default {
	components: {
		SubFooterCard,
		VideoModal
	},

	data () {
		return {
			videoVisible: false
		}
	}
}
</script>

<template>
	<SubFooterCard class="sub-footer-video sfv">
		 <g-image class="sfv__picto" src="~/assets/images/footer/picto-video.svg" width="70" />
		 <g-image class="sfv__illustration hide-sm" src="~/assets/images/footer/illustration-video.svg" width="165" />
		 <a class="sfv__play" href="#" @click="videoVisible = true">
		 	<g-image class="sfv__play-img" src="~/assets/images/footer/button-play.png" width="95" />
		 </a>
		
		<VideoModal v-if="videoVisible" @close="videoVisible = false" />
	</SubFooterCard>
</template>

<style lang="scss" scoped>
.sub-footer-video {
	background: url('../assets/images/footer/illustration-video-bg.png') center center no-repeat #1F006E;
	background-size: cover;
	color: color(white);
	padding: 0;

	@include breakpoint(medium) {
		height: 200px;
	}
}

.sfv__picto {
	position: absolute;
	top: -20px;
	left: -20px;
}

.sfv__illustration {
    position: absolute;
	left: -40px;
    bottom: -40px;
}

.sfv__play {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>