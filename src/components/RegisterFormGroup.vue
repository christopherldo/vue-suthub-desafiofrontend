<template>
    <div class="form-group">
        <label>
          {{ label }}:
          <div>
            <the-mask
              v-if="masked"
              :mask="mask"
              class="form-control"
              :value="value"
              :placeholder="placeholder"
              :disabled="disabled"
              :required="required ? true : false"
              @change.native="onChange"
            />
            <money
              v-else-if="money"
              class="form-control"
              :value="value"
              :disabled="disabled"
              :required="required ? true : false"
              @change.native="onChange"
              v-bind="moneyFormat"
            />
            <input
              v-else
              :type="type"
              class="form-control"
              :value="value"
              :placeholder="placeholder"
              :disabled="disabled"
              :required="required ? true : false"
              @change="onChange"
            >
            <div v-if="error">
              <span class="text-danger">{{ error }}</span>
            </div>
          </div>
        </label>
    </div>  
</template>

<script>
export default {
  name: 'RegisterFormGroup',
  props: {
      masked: {
          type: Boolean,
          default: false
      },
      mask: {
          type: String,
          required: false,
          default: ''
      },
      money: {
        type: Boolean,
        default: false
      },
      label: {
          type: String,
          required: true
      },
      type: {
          type: String,
          required: false,
          default: 'text'
      },
      value: {
          type: String,
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
  data() {
      return {
        moneyFormat: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
        },
      }
  },
  methods: {
      onChange(event) {
          this.$emit('input', event.target.value);
      }
  }
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

  input {
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