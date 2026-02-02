/**
 * @jest-environment jsdom
 */

import Form from '../src/Form'
import Card from '../src/Card'

describe('Form class', () => {
  let form

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="task-1"></div>
    `
    form = new Form(document)
  })

  describe('checkLuhn()', () => {
    test('valid Visa card number', () => {
      expect(form.checkLuhn('4111111111111111')).toBe(true)
    })

    test('valid Mastercard card number', () => {
      expect(form.checkLuhn('5555555555554444')).toBe(true)
    })

    test('invalid card number', () => {
      expect(form.checkLuhn('4111111111111121')).toBe(false)
    })

    test('works with numbers', () => {
      expect(form.checkLuhn(4111111111111111)).toBe(true)
    })

    test('empty string is invalid', () => {
      expect(form.checkLuhn('')).toBe(false)
    })
  })

  describe('DOM behavior', () => {
    beforeEach(() => {
      form.init()
    })

    test('form and input are created', () => {
      expect(document.querySelector('form')).not.toBeNull()
      expect(document.querySelector('input')).not.toBeNull()
      expect(document.querySelector('button')).not.toBeNull()
    })

    test('click validates card number', () => {
      const input = document.querySelector('input')
      const button = document.querySelector('button')

      input.value = '4111111111111111'
      button.click()

      expect(form.lastResult).toBe(true)
    })
  })
})

describe('Card class', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="task-1"></div>
    `
  })

  test('renders all card images', () => {
    const cards = ['a.png', 'b.png', 'c.png']
    const card = new Card(cards)

    card.init()

    const images = document.querySelectorAll('img')
    expect(images.length).toBe(cards.length)
  })
})
