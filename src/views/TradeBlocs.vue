<template>
  <main>
    <div class="container">
      <RegisterSelectGroup
        :label="'Selecione um bloco regional'"
        :value="selectedGroup"
        :options="options.regionalBlocs"
        :placeholder="'Selecione um bloco regional'"
        :required="true"
        @input="selectedGroup = $event"
        :error="errors.selectedGroup || ''"
      />
      <Loading v-if="loading" />
      <div v-if="countries.length" class="country--area">
          <CountryCard
            v-for="(country, index) in countries"
            :key="index"
            :country="country"
          />
      </div>
    </div>
  </main>  
</template>

<script>
import RegisterSelectGroup from '@/components/RegisterSelectGroup.vue';
import CountryCard from '@/components/CountryCardv2.vue';
import Loading from '@/components/Loading.vue';

import Api from '@/services/countries_v2';

export default {
  name: 'TradeBlocs',
  components: {
    RegisterSelectGroup,
    CountryCard,
    Loading
  },
  data () {
    return {
      selectedGroup: '',
      countries: [],
      errors: {},
      loading: false,
      options: {
        regionalBlocs: [
          {
            value: 'eu',
            label: 'European Union'
          },
          {
            value: 'efta',
            label: 'European Free Trade Association'
          },
          {
            value: 'caricom',
            label: 'Caribbean Community'
          },
          {
            value: 'pa',
            label: 'Pacific Alliance'
          },
          {
            value: 'au',
            label: 'African Union'
          },
          {
            value: 'usan',
            label: 'Union of South American Nations'
          },
          {
            value: 'eeu',
            label: 'Eurasian Economic Union'
          },
          {
            value: 'al',
            label: 'Arab League'
          },
          {
            value: 'asean',
            label: 'Association of Southeast Asian Nations'
          },
          {
            value: 'cais',
            label: 'Central American Integration System'
          },
          {
            value: 'cefta',
            label: 'Central European Free Trade Agreement'
          },
          {
            value: 'nafta',
            label: 'North American Free Trade Agreement'
          },
          {
            value: 'saarc',
            label: 'South Asian Association for Regional Cooperation'
          }
        ]
      }
    }
  },
  methods: {
    async fetchCountries() {
      this.countries = [];
      this.loading = true;
      try {
        const response = await Api.getCountriesByRegionalBloc(this.selectedGroup);
        this.countries = response.data;
      } catch (error) {
        this.errors.selectedGroup = error.message;
      }
      this.loading = false;
    },
  },
  watch: {
    selectedGroup (value) {
      if (value) {
        this.fetchCountries(value);
      }
    }
  },
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

    @media (max-width: 768px) {
      max-height: calc(100vh - 200px);
    }

    .country--area {
      flex: 1;
      max-height: calc(100vh - 250px);
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