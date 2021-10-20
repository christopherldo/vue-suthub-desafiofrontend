<template>
  <main class="home">
    <div class="home--left">
      <h1>Boas-vindas</h1>
      <h2>Escolha uma ação nos botões</h2>
      <img src="@/assets/undraw_good_doggy_4wfq.svg" alt="Pet Welcome Draw" height="300" width="421" loading="lazy">
    </div>
    <div class="home--right">
      <HomeNavLink desc="Cadastre o seu pet" route="register" />
      <HomeNavLink desc="Consulte países" route="countries" />
      <HomeNavLink desc="Consulte blocos regionais" route="trade-blocs" />
      <HomeNavLink desc="Sobre o site" route="about" />
    </div>
  </main>
</template>

<script>
import HomeNavLink from '@/components/HomeNavLink';

export default {
  name: 'Home',
  components: {
    HomeNavLink,
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  min-height: 100vh;
  
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }

  .home--left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;

    h1 {
      font-size: 4rem;
      margin-bottom: 30px;
    }
    
    h2 {
      font-size: 2rem;
    }

    img {
      margin-top: 30px;
    }
  }

  .home--right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 1100px) {
      width: 100%;
    }
  }
}
</style>