<template>
  <div class="modal" @click="closeModal">
      <div class="modal-close" @click="closeModal">
          <img src="@/assets/times-solid.svg" alt="Close Modal" height="25">
      </div>
      <div class="modal-area" @click.stop="">
        <div v-for="objectKey in Object.keys(data)" :key="objectKey" class="form-data-area">
          <div v-if="data[objectKey]">
            <h2>{{ objectKey }}:</h2>
            <p>{{ data[objectKey] }}</p>
          </div>
        </div>
      </div>
  </div>  
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ModalForm',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    ...mapActions(['setForm']),
    async closeModal() {
      await this.setForm({});
    }
  },
}
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 

    .modal-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background-color: #fff;
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      z-index: 1;
      cursor: pointer;

      img:hover {
        opacity: 0.5;
      }
    }

    .modal-area {
      position: relative;
      min-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      padding: 20px;
      display: flex;
      flex-direction: column;

      @media (max-width: 500px) {
        min-width: 90%;
      }

      .form-data-area {

        > div {
          padding-bottom: 5px;
          border-bottom: 1px solid #ccc;
          margin-bottom: 10px;
        }
        
        &:last-child {
          > div {
            border-bottom: none;
            margin-bottom: 0;
          }
        }
      }

      h2 {
        font-size: 20px;
        margin-bottom: 5px;
        text-transform: capitalize;
      }

      p {
        font-size: 16px;
      }
    }
  }
</style>