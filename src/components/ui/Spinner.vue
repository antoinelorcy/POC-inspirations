<script>
export default {
  props: {
    /**
     *  "small" | "medium" | "large"
     */
    size: {
      type: String,
      default: "small",
      validator: prop => ["small", "medium", "large"].includes(prop)
    }
  }
};
</script>

<template>
  <div :class="`spinner spinner--${size}`"></div>
</template>

<style lang="scss" scoped>
$spinner-sizes: (
  small: 20,
  medium: 30,
  large: 50
);
.spinner {
  background-color: rgba(color(white), 0.8);
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    display: block;
    transform: rotate(0deg);
    border: 2px solid color(grey-lighter);
    border-top-color: color(grey);
    border-radius: 100%;
    animation: spinner 1s infinite linear;
  }

  @each $key, $size in $spinner-sizes {
    &--#{$key}:before {
      width: #{$size}px;
      height: #{$size}px;
    }
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
