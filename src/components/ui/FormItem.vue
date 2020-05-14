<script>
import { uid } from "~/utils";
import Label from "./Label";

export default {
  components: {
    Label
  },

  props: {
    id: {
      type: String,
      default() {
        return uid();
      }
    },
    label: {
      type: String,
      required: true
    },
    description: String,
    validation: Object,
    validationMessages: Object
  },

  computed: {
    errors() {
      if (!this.validation) {
        return [];
      }
      return this.validation.$flattenParams().reduce((errors, rule) => {
        const isInvalid = !this.validation[rule.name];
        if (
          isInvalid &&
          this.validationMessages &&
          this.validationMessages[rule.name]
        ) {
          errors.push(this.validationMessages[rule.name]);
        }
        return errors;
      }, []);
    },
    fieldProps() {
      const props = {
        ...this.$attrs,
        id: this.id,
        validation: this.validation,
        hasError: this.validation && this.validation.$error
      };
      return props;
    }
  }
};
</script>

<template>
  <div
    class="form-item"
    :class="{ 'form-item--has-error': validation && validation.$error }"
  >
    <Label
      :id="id"
      :label="label"
      :description="description"
      :is-optional="!validation || (validation && !validation.$params.required)"
      class="form-item__label block--fluid"
    />
    <div class="form-item__field block--fluid">
      <slot v-bind="fieldProps"></slot>
    </div>
    <ul v-if="validation && validation.$error" class="form-item__error">
      <template v-if="errors.length">
        <li v-for="(error, index) in errors" :key="index" v-html="error"></li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: space(5);

  &--has-error {
    /deep/ .form-label__label {
      color: color(danger);
    }
  }
}

.form-item__field {
  margin-top: space(2);

  > * {
    width: 100%;
  }
}

.form-item__error {
  color: color(danger);
  font-style: italic;
  font-size: 1.3rem;
  padding: 5px;
  margin: space(1) space(4) 0;
}
</style>
