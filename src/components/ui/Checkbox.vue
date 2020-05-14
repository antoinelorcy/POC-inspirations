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
  }

  input[type="checkbox"] + div:before {
    content: "";
    width: $checkbox-size;
    height: $checkbox-size;
    border: 1px solid color(grey-light);
    border-radius: 3px;
    transition: all 0.3s;
    flex-shrink: 0;
  }

  input[type="checkbox"] + div:after {
    content: "";
    width: 11px;
    height: 6px;
    border-left: 2px solid color(white);
    border-bottom: 2px solid color(white);
    flex-shrink: 0;
    left: 0;
    position: absolute;
    transform: translateY(3px) translateX(2px) rotate(-45deg) scale(0.7);
    opacity: 0;
    transition: all 0.3s ease;
  }

  input[type="checkbox"]:focus + div:before,
  input[type="checkbox"] + div:hover:before {
    border-color: color(primary);
    background-color: rgba(color(primary), 0.1);
  }

  input[type="checkbox"]:checked + div {
	  color: color(primary);
	  font-weight: bold;
  }

  input[type="checkbox"]:checked + div:before {
    background-color: color(primary);
  }

  input[type="checkbox"]:checked + div:after {
    transform: translateY(3px) translateX(2px) rotate(-45deg) scale(1);
    opacity: 1;
  }

  input[type="checkbox"]:disabled + div {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    margin-left: space(2);
  }
}
</style>
