<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #222;
  font-family: 'Roboto', sans-serif;
}

main {
  padding-top: 80px;
}

@media (max-width: 768px) {
  main {
    padding-top: 143px;
  }
}
</style>
