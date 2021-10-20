<template>
  <main>
    <div class="container">
      <img src="@/assets/undraw_Developer_activity_re_39tg.svg" alt="Developer Draw" height="300" width="344" loading="lazy">
      <h1>Desenvolvido por Christopher de Oliveira</h1>
      <a href="https://github.com/christopherldo/" rel="noreferrer" target="_blank">Github</a>
    </div>
  </main>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
  .container {
    min-height: calc(100vh - 80px);
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;

    @media (max-width: 768px) {
      min-height: calc(100vh - 145px);
    }

    h1 {
      font-size: 18px;
      margin: 20px;
    }

    a {
      color: #00bcd4;
      text-decoration: none;
    }
  }
</style>