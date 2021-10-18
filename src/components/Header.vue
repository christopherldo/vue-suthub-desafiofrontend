.<template>
  <header>
    <div class="logo">
      <a href="/">
        <img src="../assets/logo.png" alt="Logo">
      </a>
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
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #111;
    height: 80px;
    border-bottom: 1px solid #444;

    .logo {
      img {
        width: 250px;
        cursor: pointer;
        filter: drop-shadow(1px 1px 0px #666);
      }
    }

    nav {
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
        font-family: Arial, Helvetica, sans-serif;
        border-bottom: 1px solid transparent;
        padding: 30px 0;
        transition: all 0.3s ease-in-out;

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