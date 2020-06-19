<script>
export default {
  props: {
	value: Boolean,
	label: String,
	disabled: Boolean
  }
};
</script>

<template>
  <label class="checkbox">
	<input
	  type="checkbox"
	  v-bind="$props"
	  :checked="value"
	  :disabled="disabled"
	  @change="$emit('input', $event.target.checked)"
	/>
	<div>
	  <span>{{ label }}</span>
	</div>
  </label>
</template>

<style lang="scss" scoped>
$checkbox-size: 15px;

.checkbox {
  display: flex;
  align-items: center;
  vertical-align: middle;
  height: 30px;
  line-height: 1em;

  input[type="checkbox"] {
	display: block;
	opacity: 0;
	width: 0;
	margin: 0;
  }

  input[type="checkbox"] + div {
	display: inline-flex;
	align-items: flex-start;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	position: relative;
	background-color: scale-color(color(grey-light), $lightness: 50%);
	padding: space(2);
	border-radius: 5px;
	border: 1px solid transparent;
	font-weight: fw(medium);
	font-size: fs(small);
	transition: all 0.3s ease;
  }

  input[type="checkbox"]:hover + div {
	background-color: scale-color(color(primary), $lightness: 85%);
  }

  input[type="checkbox"]:checked + div {
	  background-color: color(primary);
	  color: color(white);
  }

  input[type="checkbox"]:disabled + div {
	opacity: 0.5;
	cursor: not-allowed;
  }
}
</style>
