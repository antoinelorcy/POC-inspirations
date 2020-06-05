<script>
export default {
  props: {
    isVisible: Boolean
  }
};
</script>

<template>
  <ul class="dropdown-menu">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  @include overflow(vertical);

  list-style: none;
  margin: 0;
  padding: 0;
  min-width: $dropdown-min-width;
  max-height: $dropdown-max-height;
  background-color: $dropdown-background-color;
  box-shadow: $dropdown-box-shadow;
  border: $dropdown-border;
  border-radius: $dropdown-border-radius;
  z-index: $dropdown-zindex;
  width: 100%;
}
</style>
