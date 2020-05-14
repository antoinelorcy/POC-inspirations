<script>
import icons from '~/assets/images/icons/icons.json'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    viewBox: {
      type: String,
      default: "0 0 24 24"
    },
    size: {
      type: Number,
      default: 16
    },
    fillColor: {
      type: String,
      default: "currentColor"
    }
  },

  data() {
    return {
      icons: icons.icons
    };
  },

  computed: {
    iconPath() {
      if (!this.icons[this.name]) {
        throw new Error("The icon doesn't exist.");
      }

      let svgPath = this.icons[this.name].body;
      svgPath = svgPath.replace(/fill="#([a-zA-Z0-9]){6}"/gi, 'fill="inherit"'); // Replace fill="#blabla" by currentColor
      return svgPath;
    }
  }
};
</script>

<template>
  <i class="icon">
    <svg
      :view-box.camel="viewBox"
      :width="size"
      :height="size"
      :fill="fillColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g v-html="iconPath" :fill="fillColor"></g>
    </svg>
  </i>
</template>

<style lang="scss" scoped>
.icon {
  & > svg {
    display: block;
  }
}
</style>
