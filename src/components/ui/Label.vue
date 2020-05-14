<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    id: String,
    description: String,
    isOptional: Boolean
  }
};
</script>

<template>
  <div class="form-label">
    <div class="form-label__line">
      <label :for="id" class="form-label__label">{{ label }}</label>
      <span v-if="isOptional" class="form-label__optional">OPTIONNEL</span>
    </div>
    <div
      v-if="description"
      class="form-label__line form-label__description"
      v-html="description"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.form-label {
  display: inline-flex;
  vertical-align: middle;
  flex-direction: column;
}

.form-label__line {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.form-label__label {
  color: color(black-light);
}

.form-label__description {
  color: color(grey-light);
}

.form-label__optional {
  color: color(grey-light);
}
</style>
