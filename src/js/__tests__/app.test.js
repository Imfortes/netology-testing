import Form from '../Form'

describe('DOM behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="task-1"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('click validates card number', () => {
    const form = new Form(); // ← создаёт форму в DOM

    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const wrapper = document.querySelector('#task-1');

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();

    input.value = '4111111111111111';
    button.click();

    const resultSpan = wrapper.querySelector('span');
    expect(resultSpan).not.toBeNull();
    expect(resultSpan.textContent).toContain('Validate success');
    expect(input.classList.contains('validate')).toBe(true);
  });
});
