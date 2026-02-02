export default class Form {
    constructor() {
      this.cardNumber = ''
      this.validateResult = null
      this.init()
      this.bindEvents()
    }

    init() {
      const wrapper = document.querySelector('#task-1')

      this.form = document.createElement('form')
      this.input = document.createElement('input')
      this.button = document.createElement('button')

      this.button.className = 'btn btn-validate-card'
      this.button.textContent = 'Click to Validate'

      this.input.type = 'text'
      this.input.className = 'form-control input-card-number'

      this.form.className = 'd-flex gap-3'

      this.form.append(this.input, this.button)
      wrapper.append(this.form)
    }

    bindEvents() {
        this.button.addEventListener('click', e => {
          e.preventDefault()

          const result = this.validateCard(this.input.value)

          if (this.validateResult) {
              this.validateResult.remove()
          }

          this.validateResult = document.createElement('span')

          if (result.valid) {
            this.input.classList.add('validate')
            this.input.classList.remove('not-validate')
            this.validateResult.textContent = `Validate success (${result.type})`
          } else {
            this.input.classList.add('not-validate')
            this.input.classList.remove('validate')
            this.validateResult.textContent = 'Validate error'
          }

          this.form.append(this.validateResult)
        })
    
        this.input.addEventListener('input', e => {
            const value = e.target.value.replace(/\D+/g, '')
            e.target.value = value
      
            const type = this.getCardTypeByPrefix(value)
            const cards = document.querySelectorAll('img')
      
            cards.forEach(card => {
              card.classList.toggle('active', card.dataset.type === type)
            })
        })
      }

    checkLuhn(ccn) {
      const ccnS = ccn.toString();
      let sum = 0;
      const parity = (ccnS.length) % 2;
      for (let i = 0; i < ccnS.length; i += 1) {
        let digit = Number(ccnS[i]);
        if (i % 2 === parity) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
      }
      return Number(sum % 10) === 0;
    }

    getCardTypeByPrefix(number) {
        const n = number.toString()
      
        if (n.startsWith('4')) return 'visa'
        if (/^(5[1-5]|2[2-7])/.test(n)) return 'mastercard'
        if (/^3(0[0-5]|[68])/.test(n)) return 'diners'
        if (/^3[47]/.test(n)) return 'amex'
        if (/^(6011|65|64[4-9])/.test(n)) return 'discover'
        if (/^35/.test(n)) return 'jcb'
      
        return null
    }
      

    validateCard(number) {
        const value = number.replace(/\s+/g, '')
    
        if (!value) return { valid: false }
        if (!/^\d+$/.test(value)) return { valid: false }
    
        const type = this.getCardTypeByPrefix(value)
        if (!type) return { valid: false }
    
        const lengthMap = {
            visa: [13, 16, 19],
            mastercard: [16],
            amex: [15],
            diners: [14],
            discover: [16, 19],
            jcb: [16, 17, 18, 19]
        }
    
        if (!lengthMap[type]?.includes(value.length)) {
          return { valid: false }
        }
    
        if (!this.checkLuhn(value)) {
          return { valid: false }
        }
    
        return { valid: true, type }
      }
  }