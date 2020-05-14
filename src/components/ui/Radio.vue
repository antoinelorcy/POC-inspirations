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
  <label class="bk-radio">
    <input
      type="radio"
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
$radio-size: 13px;

.bk-radio {
  display: flex;
  align-items: center;
  vertical-align: middle;
  height: 30px;

  input[type="radio"] {
    display: block;
    opacity: 0;
    width: 0;
    margin: 0;
  }

  input[type="radio"] + div {
    display: inline-flex;
    align-items: flex-start;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  input[type="radio"] + div:before {
    content: "";
    width: $radio-size;
    height: $radio-size;
    box-shadow: 0 0 0 1px color(grey-light);
    border-radius: $radio-size/2;
    border: 2px solid color(white);
    margin-left: 0.1rem;
    transition: all 0.3s;
    flex-shrink: 0;
  }

  input[type="radio"]:focus + div:before,
  input[type="radio"] + div:hover:before {
    box-shadow: 0 0 0 1px color(primary);
    background-color: rgba(color(primary), 0.1);
  }

  input[type="radio"]:checked + div {
	  color: color(primary);
	  font-weight: bold;
  }

  input[type="radio"]:checked + div:before {
    background-color: color(primary);
  }

  input[type="radio"]:disabled + div {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    margin-left: space(2);
  }
}
</style>
