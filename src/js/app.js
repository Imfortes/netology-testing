import americanexpress from '../img/american-express.png'
import mastercard from '../img/card.png'
import discover from '../img/discover.png'
import jcb from '../img/jcb.png'
import money from '../img/money.png'
import visa from '../img/visa.png'

import Card from './Card.js'
import Form from './Form.js'

document.addEventListener("DOMContentLoaded", function () {
  new Card([americanexpress, mastercard, discover, jcb, money, visa])
  new Form()
});
