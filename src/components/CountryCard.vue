<template>
  <div class="card" :style="backgroundFlag">
    <div class="title">{{ portugueseName }}</div>
    <div class="body">
      <div class="detail">
        <div class="label">Nome oficial (EN):</div>
        <div class="value">{{ nativeName }}</div>
      </div>
      <div v-if="borders" class="detail">
        <div class="label">Fronteira:</div>
        <div class="value link" v-for="(border, key) in borders" :key="key" @click="goToCountry(border)">
          {{ border }}
        </div>
      </div>
      <div v-if="capital" class="detail">
        <div class="label">Capital:</div>
        <div class="value">{{ capital }} {{ capital_latLng }}</div>
      </div>
      <div v-if="coatOfArms" class="detail">
        <div class="label">Brasão de armas:</div>
        <div class="value">
          <img :src="coatOfArms" alt="Brasão de armas" height="50">
        </div>
      </div>
      <div class="detail">
        <div class="label">Continente:</div>
        <div class="value">{{ continent }}</div>
      </div>
      <div v-if="currency" class="detail">
        <div class="label">Moeda:</div>
        <div class="value">{{ currency }}</div>
      </div>
      <div class="detail">
        <div class="label">Línguas:</div>
        <div class="value link" v-for="(language, key) in languages" :key="key" @click="fetchSameLanguageCountries(language)">
          {{ language }}
        </div>
      </div>
      <div class="detail">
        <div class="label">População:</div>
        <div class="value">{{ population }}</div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'CountryCard',
  props: {
    country: {
      type: Object,
      required: true
    }
  },
  computed: {
    portugueseName() {
      return this.country.translations.por.common;
    },
    nativeName() {
      return this.country.name.official;
    },
    borders() {
      return this.country.borders;
    },
    capital() {
      if(this.country.capital) {
        return this.country.capital[0];
      }

      return '';
    },
    capital_latLng() {
      return `(lat ${this.country.capitalInfo.latlng[0]}, lng ${this.country.capitalInfo.latlng[1]})`;
    },
    coatOfArms() {
      return this.country.coatOfArms.svg;
    },
    continent() {
      return this.country.continents[0];
    },
    currency() {
      if(this.country.currencies) {
        const currencies = Object.keys(this.country.currencies);
        
        if (currencies.length > 0) {
          return this.country.currencies[currencies[0]].name;
        }
      }

      return '';
    },
    backgroundFlag() {
      const flag = this.country.flags.svg;
      return {
        backgroundImage: `url(${flag})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    },
    languages() {
      if(this.country.languages) {
        const languages = Object.keys(this.country.languages);
       
       if (languages.length > 0) {
          return languages.map(language => this.country.languages[language]);
        }
      }

      return [];
    },
    population() {
      return this.country.population;
    }
  },
  methods: {
    goToCountry(country) {
      this.$emit('goToCountryCode', country);
    },
    fetchSameLanguageCountries(language) {
      this.$emit('fetchSameLanguageCountries', language);
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    flex: 1;
    width: 100%;
    min-width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    margin: 10px;

    .title {
      width: 100%;
      padding-bottom: 10px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      color: #fff;
      text-shadow: 1px 1px 1px #000;
      text-transform: uppercase;
    }

    .body {
      width: 100%;
      padding: 20px;
      display: flex;
      flex: 1;
      flex-direction: column;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.9);

      .detail {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;

        .label {
          font-weight: bold;
        }
        
        .value {
          margin-left: 5px;

          &.link {
            cursor: pointer;
            color: #00bcd4;
            
            &:hover {
              color: #00acc1;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
</style>