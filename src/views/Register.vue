<template>
  <main>
    <form>
      <RegisterFormGroup
        label="Nome Completo"
        :value="form.name"
        placeholder="Digite seu nome completo"
        :required="true"
        @input="form.name = $event"
        :error="errors.name || ''"
      />
      <RegisterFormGroup
        :masked="true"
        label="CPF"
        mask="###.###.###-##"
        :value="form.cpf"
        placeholder="Digite seu CPF"
        :required="true"
        @input="form.cpf = $event"
        :error="errors.cpf || ''"
      />
      <RegisterFormGroup
        :masked="true"
        label="Data de nascimento"
        mask="##/##/####"
        :value="form.birthdate"
        placeholder="Digite sua data de nascimento"
        :required="true"
        @input="form.birthdate = $event"
        :error="errors.birthdate || ''"
      />
      <RegisterSelectGroup
        label="Espécie do seu pet"
        :value="form.animal"
        :options="options.animals"
        placeholder="Selecione a espécie do seu pet"
        :required="true"
        @input="form.animal = $event"
        :error="errors.animal || ''"
      />
      <RegisterSelectGroup
        key="dogBreeds"
        v-if="form.animal === 'Cachorro'"
        label="Raça do seu cachorro"
        :value="form.dog_breed"
        :options="options.dog_breeds"
        placeholder="Selecione a raça do seu cachorro"
        :required="true"
        @input="form.dog_breed = $event"
        :error="errors.dog_breed || ''"
      />
      <RegisterSelectGroup
        key="catBreeds"
        v-else-if="form.animal === 'Gato'"
        label="Raça do seu gato"
        :value="form.cat_breed"
        :options="options.cat_breeds"
        placeholder="Selecione a raça do seu gato"
        :required="true"
        @input="form.cat_breed = $event"
        :error="errors.cat_breed || ''"
      />
      <RegisterFormGroup
        v-if="[form.cat_breed, form.dog_breed].includes('Outro')"
        :label="`Raça do seu ${form.animal}`"
        :value="form.other_animal_breed"
        placeholder="Digite a raça do seu pet"
        :required="true"
        @input="form.other_animal_breed = $event"
        :error="errors.other_animal_breed || ''"
      />
      <RegisterFormGroup
        :money="true"
        label="Renda mensal"
        :mask="'123'"
        :value="form.monthly_wage"
        :required="true"
        @input="form.monthly_wage = $event"
        :error="errors.monthly_wage || ''"
      />
      <RegisterFormGroup
        :masked="true"
        label="CEP"
        mask="#####-###"
        :value="form.cep"
        placeholder="Digite seu CEP"
        :required="true"
        @input="form.cep = $event"
        :error="errors.cep || ''"
      />
      <RegisterFormGroup
        label="Rua"
        :value="form.street"
        placeholder="Digite o nome da sua rua"
        :required="true"
        @input="form.street = $event"
        :error="errors.street || ''"
      />
      <RegisterFormGroup
        label="Bairro"
        :value="form.neighborhood"
        placeholder="Digite o nome do seu bairro"
        :required="true"
        @input="form.neighborhood = $event"
        :error="errors.neighborhood || ''"
      />
      <RegisterFormGroup
        label="Cidade"
        :value="form.city"
        placeholder="Digite o nome da sua cidade"
        :required="true"
        @input="form.city = $event"
        :error="errors.city || ''"
      />
      <RegisterFormGroup
        :masked="true"
        label="Estado (UF)"
        mask="AA"
        :value="form.state"
        placeholder="Digite a sigla UF do seu estado"
        :required="true"
        @input="form.state = $event"
        :error="errors.state || ''"
      />
      <button type="submit" class="btn btn-primary" @click.prevent="register">Submit</button>
    </form>
    <ModalForm v-if="Object.keys(formState).length" :data="formState" />
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import RegisterFormGroup from '@/components/RegisterFormGroup';
import RegisterSelectGroup from '@/components/RegisterSelectGroup';
import ModalForm from '@/components/ModalForm';
import FormValidator from '@/helpers/FormValidator';

import Api from '@/services/cep';

export default {
  name: 'Register',
  components: {
    RegisterFormGroup,
    RegisterSelectGroup,
    ModalForm,
  },
  computed: {
    ...mapGetters(['formState']),
  },
  data () {
    return {
      form: {
        name: '',
        cpf: '',
        birthdate: '',
        animal: '',
        dog_breed: '',
        cat_breed: '',
        other_animal_breed: '',
        monthly_wage: '',
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      options: {
        animals: [
          {
            value: 'Cachorro',
            label: 'Cachorro',
          },
          {
            value: 'Gato',
            label: 'Gato',
          },
        ],
        dog_breeds: [
          { value: 'Pastor-alemão', label: 'Pastor-alemão' },
          { value: 'Lulu-da-pomerânia', label: 'Lulu-da-pomerânia' },
          { value: 'Labrador', label: 'Labrador' },
          { value: 'Poodle', label: 'Poodle' },
          { value: 'Pug', label: 'Pug'},
          { value: 'Outro', label: 'Outro' },
        ],
        cat_breeds: [
          { value: 'Persa', label: 'Persa' },
          { value: 'Siamês', label: 'Siamês' },
          { value: 'Bengal', label: 'Bengal' },
          { value: 'Maine Coon', label: 'Maine Coon' },
          { value: 'British Shorthair', label: 'British Shorthair' },
          { value: 'Outro', label: 'Outro' },
        ],
      },
      errors: {}
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        if (this.form.animal === '') {
          this.form.dog_breed = '';
          this.form.cat_breed = '';
          this.form.other_animal_breed = '';
        } else if (this.form.animal === 'Cachorro') {
          this.form.cat_breed = '';

          if(this.form.dog_breed !== 'Outro') {
            this.form.other_animal_breed = '';
          }
        } else if (this.form.animal === 'Gato') {
          this.form.dog_breed = '';
          
          if(this.form.cat_breed !== 'Outro') {
            this.form.other_animal_breed = '';
          }
        }

        if (this.isValidCEP(this.form.cep)) {
          this.getAddress();
        }

        this.errors = {};
      },
    }
  },
  methods: {
    ...mapActions(['setForm']),
    async register() {  
      this.errors = {};

      const validator = new FormValidator();

      validator.validate(this.form);

      if(validator.hasErrors()) {
        this.errors = validator.getErrors();
        this.$swal({
          icon: 'error',
          title: 'Erro',
          text: 'Preencha todos os campos corretamente',
          type: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }

      await this.setForm(this.form);
    },
    isValidCEP(value) {
      if (typeof value !== 'string') return false;

      value = value.replace(/[^\d]+/g, '');

      if (value.length !== 8) return false;

      return true;
    },
    async getAddress() {
      const cep = this.form.cep.replace(/[^\d]+/g, '');

      try {
        const response = await Api.getCEP(cep);

        if (response.erro) {
          this.errors.cep = 'CEP não encontrado';
          return;
        }

        response.logradouro && (this.form.street = response.logradouro);
        response.bairro && (this.form.neighborhood = response.bairro);
        response.localidade && (this.form.city = response.localidade);
        response.uf && (this.form.state = response.uf);

        this.errors.cep = '';
      } catch (error) {
        this.errors.cep = 'Erro ao buscar CEP';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  form {
    margin: 20px auto;
    max-height: calc(100vh - 120px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75vw;
    max-width: 1000px;
    border: 1px solid #ccc;
    border-radius: 0.25em;
    padding: 20px;

    button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 0.25em;
      background-color: #0aeb83;
      color: #333;
      font-size: 1.2em;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      border: 1px solid #0aeb83;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: transparent;
        border-color: #0aeb83;
        color: #0aeb83;
      }
    }
  }
</style>