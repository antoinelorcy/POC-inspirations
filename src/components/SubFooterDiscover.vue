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
		 <g-image class="sfd__picto" src="~/assets/images/footer/picto-bee.svg" width="80" />
		 <g-image class="sfd__illustration hide-sm" src="~/assets/images/footer/illustration-man.svg" width="76" />
		<p>
			Découvrez comment beekast peut vous aider à animer des réunions efficaces, collaboratives et engageantes.
		</p>
		<Button label="Découvrir Beekast" color="grey-light" />
	</SubFooterCard>
</template>

<style lang="scss" scoped>
.sub-footer-discover {
	background: #1F006E;
	color: color(white);
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
</style>