<template>
  <main>
    <div class="container">
      <RegisterFormGroup
        :value="searchBar"
        placeholder="Pesquise por um país e aperte ENTER"
        @input="searchBar = $event"
        :error="searchBarError"
      />
      <div v-if="countries.length" class="country--area">
          <CountryCard
            v-for="(country, index) in countries"
            :key="index"
            :country="country"
            @click="selectCountry(country)"
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

import Api from '@/services/countries';

export default {
  name: 'Countries',
  components: {
    RegisterFormGroup,
    CountryCard
  },
  data () {
    return {
      country: {},
      countries: [],
      searchBar: '',
      searchBarError: '',
      errors: {},
    };
  },
  methods: {
    resetCountry () {
      this.country = {};
      this.countries = [];
    },
    async searchCountry(value) {
      this.resetCountry();
      try {
        const response = await Api.getCountryByName(value);
        this.countries = response.data;
      } catch (error) {
        this.searchBarError = error.message;
      }
    },
    async goToCountryCode(country) {
      this.resetCountry();
      try {
        const response = await Api.getCountryByCode(country);
        this.countries = response.data;
      } catch (error) {
        this.searchBarError = error.message;
      }
    },
    async fetchSameLanguageCountries(language) {
      this.resetCountry();
      try {
        const response = await Api.getCountriesByLanguage(language);
        this.countries = response.data;
      } catch (error) {
        this.searchBarError = error.message;
      }
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
    width: 75vw;
    border: 1px solid #ccc;
    border-radius: 0.25em;
    padding: 20px;

    .country--area {
      flex: 1;
      max-height: calc(100vh - 225px);
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
  }
</style>