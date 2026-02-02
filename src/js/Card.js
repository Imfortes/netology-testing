import americanexpress from '../img/american-express.png'
import mastercard from '../img/card.png'
import discover from '../img/discover.png'
import jcb from '../img/jcb.png'
import money from '../img/money.png'
import visa from '../img/visa.png'

export default class Card {
  constructor() {
    this.cards = [
      {type: 'amex', src: americanexpress},
      {type: 'mastercard', src: mastercard},
      {type: 'discover', src: discover},
      {type: 'jcb', src: jcb},
      {type: 'diners', src: money},
      {type: 'visa', src: visa}
    ]
    this.init()
  }

  init() {
    const wrapper = document.querySelector('#task-1')
    const cardWrapper = document.createElement('div')
    cardWrapper.className = 'grid-col grid-col-6'
    wrapper.append(cardWrapper)

    this.cards.map(card => {
      const img = document.createElement('img')
      img.classList.add('card-img')
      img.dataset.type = card.type
      img.src = card.src
      cardWrapper.append(img)
    })
    console.log('Card init')
  }

}
