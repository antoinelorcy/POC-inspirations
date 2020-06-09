<script>
import { createPopper } from "@popperjs/core";
import { mixin as clickaway } from "vue-clickaway";
import DropdownMenu from "./DropdownMenu";
import DropdownItem from "./DropdownItem";

export default {
  mixins: [clickaway],
  components: {
    DropdownMenu,
    DropdownItem
  },
  props: {
    value: {
      type: [String, Object],
      required: true
    },
    valueKey: String,
    options: {
      type: Array,
      required: true
    },
    placeholder: String,
    closeOnSelect: Boolean
  },

  data() {
    return {
      popperInstance: null,
      popperVisible: false
    };
  },

  computed: {
    selectValue () {
      if (Object.keys(this.value).length) {
        if (this.valueKey && this.value[this.valueKey]) {
          return this.value[this.valueKey];
        } else {
          return this.value;
        }
      }
  
      return this.placeholder;
    }
  },

  mounted() {
    this.createPopper();
  },

  beforeDestroy() {
    this.destroyPopper();
  },

  methods: {
    select(value) {
      this.$emit("input", value);

      if (this.closeOnSelect) {
        this.hidePopper();
      }
    },

    showPopper() {
      this.popperVisible = true;
      this.popperInstance.update();
    },

    hidePopper() {
      this.popperVisible = false;
    },

    togglePopper() {
      if (this.popperVisible) {
        this.hidePopper();
      } else {
        this.showPopper();
      }
    },

    createPopper() {
      this.popperInstance = createPopper(this.$el, this.$refs.popper.$el, {
        placement: "bottom"
      });
    },

    destroyPopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    }
  }
};
</script>

<template>
  <div
    v-on-clickaway="hidePopper"
    class="select"
    :class="{
      'select--has-value': selectValue != placeholder
    }"
  >
    <div class="select__trigger" @click="togglePopper">
      <div class="select__trigger-value">
        {{ selectValue }}
      </div>

      <div class="select__trigger-actions">
        <Icon
          name="arrow-down"
          class="select__trigger-icon m-l-2"
          :class="{ 'select__trigger-icon--rotated': popperVisible }"
          :size="15"
        />
      </div>
    </div>

    <transition name="select-transition">
      <DropdownMenu
        v-show="popperVisible"
        ref="popper"
        class="block--fluid"
      >
         <DropdownItem
            v-for="(option, index) in options"
            :key="index"
            :item="option"
            :is-active="option.value === value.value"
            @click="select(option)"
          ></DropdownItem>
      </DropdownMenu>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
$trigger-height: 40px;

.select {
  display: inline-flex;
  vertical-align: middle;
  position: relative;
  min-width: 170px;
}

.select__trigger {
  width: 100%;
  height: $trigger-height;
  line-height: $trigger-height;
  outline: none;
  padding: 0 space(2);
  background-color: color(white);
  border: 1px solid #eee;
  border-radius: radius(1);
  color: color(black-light);
  transition: border-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: color(grey-light);
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: color(primary);
  }

  .select--has-value & {
    color: color(black-light);
  }
}

.select__trigger-actions {
  display: flex;
  align-items: center;
}

.select__trigger-value {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: inline-block;
  text-align: left;
}

.select__trigger-actions {
  margin-left: space(2);
}

.select__trigger-icon {
  transition: transform 0.2s ease;
  color: color(grey-light);

  &--rotated {
    transform: rotate(180deg);
  }
}

.select-transition-enter-active {
  transition: opacity 0.3s ease;
}
.select-transition-enter {
  opacity: 0;
}

.select-transition-leave-active,
.select-transition-leave-to {
  display: none;
}
</style>
