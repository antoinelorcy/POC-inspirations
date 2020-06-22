<template>
	<div class="video-modal">
		<a href="#" @click.prevent="$emit('close')" class="video-modal__close"></a>
		<div class="video-modal__wrapper">
			<div class="video-modal__embed">
				<Button 
					icon="close"
					color="primary-dark"
					class="video-modal__close-btn"
					@click.prevent="$emit('close')"
				/>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/Jx66Py7hyzs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted () {
		document.body.classList.add('body--is-scroll-locked');
	},

	beforeDestroy () {
		document.body.classList.remove('body--is-scroll-locked');
	}
}
</script>

<style lang="scss" scoped>
.video-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: 900;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(color(black), 0.5);
	animation: fade-in 0.3s ease;
}

.video-modal__close {
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.video-modal__close-btn {
	position: absolute;
	top: -10px;
	right: -10px;
	z-index: 1;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: none !important;
}

.video-modal__wrapper {
	position: relative;
	z-index: 1;
	width: 100%;
	max-width: 800px;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: from-top 0.3s ease;

	@include breakpoint(medium) {
		width: 90%;
		max-width: 100%;
	}
}

.video-modal__embed {
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 0;
	height: 0;
	width: 100%;

	> iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		background-color: rgba(0,0,0,.9);
		box-shadow: 0 0 40px rgba(0,0,0,.3);
		overflow: hidden;
	}
}

@keyframes fade-in {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}

@keyframes from-top {
  0% {
	transform: translateY(-100px);
	opacity: 0;
  }

  100% {
	transform: translateY(0);
	opacity: 1;
  }
}
</style>