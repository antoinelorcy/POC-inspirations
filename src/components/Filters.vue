<template>
	<div>
		<h3>{{ title }}</h3>
		<div v-for="goal in value" :key="goal.id">
          <input type="checkbox" name="goals" :id="goal.id" :value="goal.id" v-model="goal.checked" />
          <label :for="goal.id">{{ goal.title }}</label>
        </div>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		value: Array
	}
}
</script>