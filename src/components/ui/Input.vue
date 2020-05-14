<script>
import { uid } from "~/utils";

export default {
  inheritAttrs: false,

  props: {
    id: {
      type: String,
      required: false,
      default() {
        return uid();
      }
    },
    value: {
      type: String,
      required: true
    },
    maxLength: Number,
    icon: String,
    prefix: String,
    hasError: {
      type: Boolean,
      default: false
    }
  },
  

  data () {
    return {
      isFocus: false
    };
  },

  computed: {
    inputProps() {
      const props = {
        ...this.$attrs,
        value: this.value,
        id: this.id
      };

      if (this.maxLength) {
        props.maxlength = this.maxLength;
      }

      if (this.showPassword) {
        props.type = "text";
      }

      return props;
    },
    inputEvents() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
        change: this.onChange
      };
    }
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },

    onFocus(e) {
      this.$emit("focus", e);
      this.isFocus = true;
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
    onBlur(e) {
      this.$emit("blur", e);
      this.isFocus = false;
    },
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

<template>
  <div
    class="input"
    :class="{
      'input--has-error': hasError,
      'input--has-icon': icon,
      'input--has-length': maxLength,
      'input--has-prefix': prefix,
      'input--is-focus': isFocus
    }"
  >
    <span v-if="prefix" class="input__prefix">{{ prefix }}</span>

    <div class="input__input-wrapper">
      <span v-if="icon" class="input__icon"><Icon :name="icon" /></span>
      <input
        ref="input"
        v-bind="inputProps"
        v-on="inputEvents"
        class="input__input"
      />

      <!-- Max length indicator -->
      <span v-if="maxLength" class="input__length">
        <strong>{{ value ? value.length : 0 }}</strong
        >/{{ maxLength }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$input-height: 40px;
$input-length-width: 52px;

.input {
  display: inline-flex;
  vertical-align: middle;
}

.input__input-wrapper {
  position: relative;
  width: 100%;
}

.input__input {
  width: 100%;
  height: $input-height;
  line-height: $input-height;
  outline: none;
  padding: 0 space(2);
  border: 1px solid transparent;
  border-radius: 5px;
  color: color(black-light);
  background-color: color(grey-lighter);
  transition: all 0.3s ease;

  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
    background-color: inherit;
  }

  .input--is-focus & {
    border-color: color(grey-light);
    box-shadow: 2px 2px 0 #D8D9DF;
    background-color: color(white);
  }

  .input--has-error & {
    box-shadow: 2px 2px 0 scale-color(color(danger), $lightness: 50%);
  }

  .input--has-icon & {
    padding-left: $input-height;
  }

  .input--has-length & {
    padding-right: $input-length-width;
  }

  .input--has-prefix & {
    border-radius: 0 5px 5px 0;
  }
}

.input__icon {
  height: $input-height;
  width: $input-height;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: color 0.3s ease;

  .icon {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .input--is-focus & {
    color: color(black-light);
  }
}

.input__length {
  height: $input-height;
  width: $input-length-width;
  line-height: $input-height;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}

.input__prefix {
  height: $input-height;
  line-height: $input-height;
  padding: 0 space(2);
  border-radius: 5px 0 0 5px;
  background-color: color(grey-lighter);
}
</style>
