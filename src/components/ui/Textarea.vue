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
    hasError: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 2
    }
  },

  data() {
    return {
      initialScrollHeight: 0,
	  initialRowsCount: 0,
	  isFocus: false
    };
  },

  watch: {
    value() {
      this.$nextTick(() => this.setTextareaAutoHeight());
    }
  },

  computed: {
    textareaProps() {
      const props = {
		...this.$attrs,
		value: this.value,
		id: this.id,
		rows: this.rows
      };

      if (this.maxLength) {
        props.maxlength = this.maxLength;
      }

      return props;
	},
	
	textareaEvents() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur,
        change: this.onChange
      };
    }
  },

  mounted() {
    this.getInitialState();
  },

  methods: {
    getInitialState() {
      this.$refs.textarea.value = "";
      this.initialScrollHeight = this.$refs.textarea.scrollHeight;
      this.initialRowsCount = this.$refs.textarea.rows;
      this.$refs.textarea.value = this.value;
      this.setTextareaAutoHeight();
	},

    setTextareaAutoHeight() {
      this.$refs.textarea.rows = this.initialRowsCount;
      this.$refs.textarea.rows += Math.ceil(
        (this.$refs.textarea.scrollHeight - this.initialScrollHeight) / 16
      );
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
    class="textarea"
    :class="{
      'textarea--has-error': hasError,
      'textarea--has-length': maxLength,
	  'textarea--is-focus': isFocus
    }"
  >
    <textarea
      ref="textarea"
      v-bind="textareaProps"
      v-on="textareaEvents"
      class="textarea__textarea"
    />

    <!-- Max length indicator -->
    <span v-if="maxLength" class="textarea__length">
      <strong>{{ value ? value.length : 0 }}</strong
      >/{{ maxLength }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
$length-indicator-width: 52px;

.textarea {
  display: inline-flex;
  vertical-align: middle;
  position: relative;
}

.textarea__textarea {
  width: 100%;
  outline: none;
  padding: space(3) space(2);
  border: 1px solid transparent;
  border-radius: 5px;
  color: color(black-light);
  background-color: color(grey-lighter);
  transition: all 0.3s ease;
  resize: none;

  .textarea--is-focus & {
    border-color: color(grey-light);
    box-shadow: 2px 2px 0 #D8D9DF;
    background-color: color(white);
  }

  .textarea--has-error & {
    box-shadow: 2px 2px 0 scale-color(color(danger), $lightness: 50%);
  }

  .textarea--has-length & {
    padding-right: $length-indicator-width;
  }
}

.textarea__length {
  height: 30px;
  width: $length-indicator-width;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
