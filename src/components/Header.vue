.<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Logo" width="250" height="38">
      </router-link>
    </div>
    <nav class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/register">Registro</router-link>
      <router-link to="/countries">Países</router-link>
      <router-link to="/trade-blocs">Blocos Regionais</router-link>
      <router-link to="/about">Sobre</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #111;
    height: 80px;
    border-bottom: 1px solid #444;
    position: fixed;

    @media (max-width: 768px) {
      flex-direction: column;
      height: auto;
      padding-bottom: 0;
    }

    .logo {
      img {
        cursor: pointer;
        filter: drop-shadow(1px 1px 0px #666);
      }
    }

    nav {
      display: flex;
      align-items: center;

      &:hover {
        a {
          opacity: 0.5;

          &:hover {
            opacity: 1;

            &:not(&.router-link-exact-active) {
              border-color: #fff;
            }
          }
        }
      }

      a {
        font-weight: bold;
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        border-bottom: 1px solid transparent;
        padding: 30px 0;
        transition: all 0.3s ease-in-out;
        letter-spacing: 1px;

        &:not(:last-child) {
          margin-right: 1rem;
        }

        &.router-link-exact-active {
          color: #03d5c7;
          border-color: #03d5c7;
        }
      }
    }
  }
</style>