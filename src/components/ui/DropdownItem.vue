<script>
export default {
  props: {
    item: Object,
    isActive: Boolean,
    isHighlighted: Boolean,
    isPlaceholder: Boolean
  },

  computed: {
    itemClasses() {
      let classesPrefix = "dropdown-item";
      let classes = [classesPrefix];

      if (!this.item) {
        return classes;
      }

      if (this.item.isDivided) {
        classes.push(`${classesPrefix}--is-divided`);
      }

      if (this.item.hoverState) {
        classes.push(`${classesPrefix}--hover-${this.item.hoverState}`);
      }

      if (this.isActive) {
        classes.push(`${classesPrefix}--is-active`);
      }

      if (this.isHighlighted) {
        classes.push(`${classesPrefix}--is-highlighted`);
      }

      return classes;
    }
  }
};
</script>

<template>
  <li :class="itemClasses">
    <button @click="$emit('click')" @mouseenter="$emit('mouseenter')">
      <template v-if="isPlaceholder">
        No result. :(
      </template>
      <template v-else>
        <Icon
          v-if="item.icon"
          :name="item.icon"
          :size="15"
          class="m-r-2"
        />
        {{ item.label }}
      </template>
    </button>
  </li>
</template>

<style lang="scss" scoped>
.dropdown-item {
  display: block;
  width: 100%;

  &--is-divided > button {
    border-top: 1px solid color(grey);
  }

  &--is-active > button {
    font-weight: $font-weight-semi-bold !important;
    color: color(primary) !important;
  }

  &--is-highlighted > button {
    background-color: color(grey-lighter) !important;
  }

  > button {
    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    /* Corrects inability to style clickable `input` types in iOS */
    -webkit-appearance: none;
    border: none;
    outline: none;
    padding: 10px;
    text-align: left;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    background-color: color(white);
    border-bottom: 1px solid color(grey-lighter);
    color: color(grey);
    cursor: pointer;

    &:hover {
      background-color: color(grey-lighter);
    }
  }
}
</style>
