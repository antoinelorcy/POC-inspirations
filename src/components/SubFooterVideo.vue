<script>
import SubFooterCard from './SubFooterCard';

export default {
	components: {
		SubFooterCard
	}
}
</script>

<template>
	<SubFooterCard class="sub-footer-discover sfd">
		 <g-image class="sfd__picto" src="~/assets/images/footer/picto-video.svg" width="70" />
		 <g-image class="sfd__illustration hide-sm" src="~/assets/images/footer/illustration-video.svg" width="165" />
		 <a class="sfd__play" href="#">
		 	<g-image class="sfd__play-img" src="~/assets/images/footer/button-play.png" width="95" />
		 </a>
	</SubFooterCard>
</template>

<style lang="scss" scoped>
.sub-footer-discover {
	background: url('../assets/images/footer/illustration-video-bg.png') center center no-repeat #1F006E;
	background-size: cover;
	color: color(white);
	padding: 0;
}

.sfd__picto {
	position: absolute;
	top: -20px;
	left: -20px;
}

.sfd__illustration {
    position: absolute;
	left: -40px;
    bottom: -40px;
}

.sfd__play {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>