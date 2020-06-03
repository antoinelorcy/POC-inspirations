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
		 <g-image class="sfd__picto" src="~/assets/images/footer/picto-account.svg" width="55" />
		 <g-image class="sfd__illustration hide-sm" src="~/assets/images/footer/illustration-woman.svg" width="113" />
		<p>
			Créez votre compte dès maintenant et testez Beekast avec vos collaborateurs, c’est gratuit.
		</p>
		<Button label="Créer un compte gratuitement" />
	</SubFooterCard>
</template>

<style lang="scss" scoped>
.sub-footer-discover {
	background: #EBE8F2;
}

.sfd__picto {
	position: absolute;
	top: -20px;
	left: -20px;
}

.sfd__illustration {
    position: absolute;
	right: -40px;
    bottom: -40px;
}
</style>