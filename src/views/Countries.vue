<template>
  <main>
    <div class="container">
      <RegisterFormGroup
        :value="searchBar"
        placeholder="Pesquise por um país e aperte ENTER"
        @input="searchBar = $event"
        :error="searchBarError"
      />
      
      <Loading v-if="loading"/>
      <div v-if="countries.length" class="country--area">
          <CountryCard
            v-for="(country, index) in countries"
            :key="index"
            :country="country"
            @goToCountryCode="goToCountryCode"
            @fetchSameLanguageCountries="fetchSameLanguageCountries"
          />
      </div>
    </div>
  </main>
</template>

<script>
import RegisterFormGroup from '@/components/RegisterFormGroup.vue';
import CountryCard from '@/components/CountryCard.vue';
import Loading from '@/components/Loading.vue';

import Api from '@/services/countries';

export default {
  name: 'Countries',
  components: {
    RegisterFormGroup,
    CountryCard,
    Loading
  },
  data () {
    return {
      countries: [],
      searchBar: '',
      searchBarError: '',
      errors: {},
      loading: true,
    };
  },
  methods: {
    resetCountry () {
      this.countries = [];
    },
    async searchCountry(value) {
      this.resetCountry();
      this.loading = true;
      try {
        const response = await Api.getCountryByName(value);
        this.countries = response.data;
      } catch (error) {
        this.searchBarError = error.message;
      }
      this.loading = false;
    },
    async goToCountryCode(country) {
      this.resetCountry();
      this.loading = true;
      try {
        const response = await Api.getCountryByCode(country);
        this.countries = response.data;
      } catch (error) {
        this.searchBarError = error.message;
      }
      this.loading = false;
    },
    async fetchSameLanguageCountries(language) {
      this.resetCountry();
      this.loading = true;
      try {
        const response = await Api.getCountriesByLanguage(language);
        this.countries = response.data;
      } catch (error) {
        this.searchBarError = error.message;
      }
      this.loading = false;
    }
  },
  watch: {
    searchBar (value) {
      this.searchBarError = '';
      if (value.length) {
        this.searchCountry(value);
      }
    }
  },
  mounted() {
    const initialCountry = 'Brazil';
    this.searchCountry(initialCountry);
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;
    min-height: calc(100vh - 120px);
    width: 90vw;
    border: 1px solid #ccc;
    border-radius: 0.25em;
    padding: 20px;

    @media (max-width: 768px) {
      min-height: calc(100vh - 190px);
    }

    .country--area {
      flex: 1;
      max-height: calc(100vh - 225px);
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;

      @media (max-width: 768px) {
        max-height: calc(100vh - 300px);
      }
    }
  }
</style>