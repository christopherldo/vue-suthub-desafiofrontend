class FormValidator {
  constructor() {
    this.errors = {};
  }

  static validations() {
    return {
      name: ['required', 'words:2'],
      cpf: ['required', 'cpf'],
      birthdate: ['required', 'date', 'date:past', 'min:18', 'max:65'],
      animal: ['required'],
      dog_breed: ['optional', 'required_if:animal:Cachorro'],
      cat_breed: ['optional', 'required_if:animal:Gato'],
      other_animal_breed: ['optional', 'required_if:dog_breed|cat_breed:Outro'],
      monthly_wage: ['required', 'money', 'min:1000'],
      cep: ['required', 'cep'],
      street: ['required'],
      neighborhood: ['required'],
      city: ['required'],
      state: ['required', 'words:1', 'length:2'],
    }
  }

  validate(form) {
    this.errors = {};

    for (let field in form) {
        let validations = FormValidator.validations()[field];
        if (validations) {
          validations.forEach(validation => {
            if (validation === 'required' && !this.isValidRequired(form[field])) {
              this.errors[field] = 'Campo obrigatório';
            } else if (validation.includes('words')) {
              let words = validation.split(':');
              
              if (words[1] && !this.isValidWords(form[field], words[1])) {
                this.errors[field] = `O campo deve ter no mínimo ${words[1]} palavras`;
              }
            } else if (validation === 'cpf' && !this.isValidCPF(form[field])) {
              this.errors[field] = 'CPF inválido';
            } else if (validation === 'date') {
              if (form[field] && form[field].length === 10) {
                let date = form[field].split('/');
                let day = date[0];
                let month = date[1];
                let year = date[2];
                let dateObj = new Date(year, month - 1, day);

                if (dateObj.getFullYear() !== +year || dateObj.getMonth() + 1 !== +month || dateObj.getDate() !== +day) {
                  this.errors[field] = 'Data inválida';
                } 

                if (!this.isValidPastDate(dateObj)) {
                  this.errors[field] = 'Data inválida';
                }
                
                let min = validations.find(validation => validation.includes('min'));
                let max = validations.find(validation => validation.includes('max'));
                
                if (min && !max) {
                  let minDate = new Date();
                  let minAge = min.split(':')[1];
                  minDate.setFullYear(minDate.getFullYear() - minAge);

                  if (dateObj > minDate) {
                    this.errors[field] = `Idade mínima de ${minAge} anos`;
                  }
                }

                if (max && !min) {
                  let maxDate = new Date();
                  let maxAge = max.split(':')[1];

                  maxDate.setFullYear(maxDate.getFullYear() - maxAge);

                  if (dateObj < maxDate) {
                    this.errors[field] = `Idade máxima de ${maxAge} anos`;
                  }
                }

                if (min && max) {
                  let minDate = new Date();
                  let minAge = min.split(':')[1];
                  minDate.setFullYear(minDate.getFullYear() - minAge);

                  let maxDate = new Date();
                  let maxAge = max.split(':')[1];
                  maxDate.setFullYear(maxDate.getFullYear() - maxAge);

                  if (dateObj > minDate || dateObj < maxDate) {
                    this.errors[field] = `Idade entre ${minAge} e ${maxAge} anos`;
                  }
                }
              } else {
                this.errors[field] = 'Data inválida';
              }
            } else if (validation === 'optional') {
              let requiredIf = validations.find(validation => validation.includes('required_if'));

              if (requiredIf) {
                let requiredIfFields = requiredIf.split(':')[1].split('|');
                let requiredIfValue = requiredIf.split(':')[2];

                if (Object.keys(form).find(field => requiredIfFields.includes(field) && form[field] === requiredIfValue)) {
                  if (!this.isValidRequired(form[field])) {
                    this.errors[field] = 'Campo obrigatório';
                  }
                }
              }
            } else if (validation === 'money') {
              if (!this.isValidMoney(form[field])) {
                this.errors[field] = 'Valor inválido';
              }

              let min = validations.find(validation => validation.includes('min'));

              if (min) {
                let minValue = min.split(':')[1];
                let value = form[field].replace(/[^\d]+/g, '') / 100;

                if (value < minValue) {
                  this.errors[field] = `Valor mínimo de R$ ${minValue}`;
                }
              }
            } else if (validation.includes('length')) {
              let length = validation.split(':')[1];
              if (!this.isValidLength(form[field], length)) {
                this.errors[field] = `O campo deve ter ${length} caracteres`;
              }
            } else if (validation === 'cep') {
              if (!this.isValidCEP(form[field])) {
                this.errors[field] = 'CEP inválido';
              }
            }
          });
        }
    }

    return this.errors;
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  getErrors() {
    return this.errors;
  }

  isValidRequired(value) {
    return value !== '';
  }

  isValidWords(value, words) {
    return value.split(' ').length >= words;
  }
  
  isValidPastDate(date) {
    let today = new Date();

    return date < today;
  }

  isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false
    
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

    cpf = cpf.split('');

    const validator = cpf.filter((digit, index, array) => index >= array.length - 2 && digit).map( el => +el );
    const toValidate = pop => cpf.filter((digit, index, array) => index < array.length - pop && digit).map(el => +el);
    const rest = (count, pop) => (toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10;

    return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])
  }

  isValidMoney(value) {
    if(!value) return false;

    const moneyArray = value.split(' ');
    const signal = moneyArray[0] === 'R$';
    const isNegative = moneyArray[1].indexOf('-') !== -1;

    if(signal && !isNegative) {
      return true;
    } 

    return false;
  }

  isValidLength(value, length) {
    length = parseInt(length);

    if (typeof value !== 'string') return false;

    return value.length === length;
  }

  isValidCEP(value) {
    if (typeof value !== 'string') return false;

    value = value.replace(/[^\d]+/g, '');

    if (value.length !== 8) return false;

    return true;
  }
}

export default FormValidator;