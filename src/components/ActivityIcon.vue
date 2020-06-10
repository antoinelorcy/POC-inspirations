<template>
	<div :class="['activity-icon', typeClassname]">	
		<g-image :src="iconSrc" width="25" />
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},

	computed: {
		iconSrc () {
			let iconName = this.name;
			if (!iconName) {
				iconName = 'instructions';
			}

			return require('~/assets/images/activities/icon-25-25-'+ iconName +'.svg');
		},

		typeClassname () {
			return 'activity-icon--' + this.type || 'no';
		}
	}
}
</script>

<style lang="scss" scoped>
.activity-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
</style>