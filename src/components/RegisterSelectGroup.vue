<template>
    <div class="form-group">
        <label>
          {{ label }}:
          <div>
            <select value="selected" class="form-control" @change="onChange" :required="required ? true : false">
              <option value="" :disabled="required ? true : false" selected>{{ placeholder }}</option>
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </label>
        <div v-if="error">
          <span class="text-danger">{{ error }}</span>
        </div>
    </div>  
</template>

<script>
export default {
  name: 'RegisterFormGroup',
  props: {
      label: {
          type: String,
          required: true
      },
      value: {
          type: String,
          required: true
      },
      options: {
          type: Array,
          required: true
      },
      placeholder: {
          type: String,
          required: false,
          default: ''
      },
      disabled: {
          type: Boolean,
          required: false,
          default: false
      },
      required: {
          type: Boolean,
          required: false,
          default: false
      },
      error: {
          type: String,
          required: false,
          default: ''
      }
  },
  methods: {
      onChange(event) {
          this.$emit('input', event.target.value);
      }
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 20px;
  width: 100%;

  label {
    display: block;
    font-weight: bold;
    color: #fff;
  }

  select {
    width: 100%;
    margin-top: 10px;
    border-radius: 0.25em;
    border-bottom: 1px solid #ccc;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-color: #ccc;
    padding: 10px;
  }

  .text-danger {
    display: block;
    margin-top: 5px;
    color: #ff0000;
  }
}
</style>