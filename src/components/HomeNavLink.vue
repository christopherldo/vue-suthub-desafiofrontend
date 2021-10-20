<template>
  <button @click="goToRoute">{{ desc }}</button>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    },
  },
  methods: {
    goToRoute() {
      this.$router.push(this.route)
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    width: 50%;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.2em;
    padding: 0.5em 1em;
    margin: 0.5em;
    border-radius: 0.25em;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1px solid #fff;

    &:hover {
      background: #fff;
      color: #000;
    }

    @media (max-width: 1100px) {
      width: 90%;
    }
  }
</style>