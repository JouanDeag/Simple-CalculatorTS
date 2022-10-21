// Import the math module
import mexp from 'math-expression-evaluator';

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Get the calculator
  const calculator = document.querySelector<HTMLDivElement>('.calc-wrapper');

  // Get mode buttons
  const modeButtons = document.querySelectorAll<HTMLButtonElement>('.mode');

  // Add calculator screen to DOM

  // Setup the calculator screen
  const calculatorScreen = document.createElement('div');
  calculatorScreen.classList.add('calc-screen');

  calculatorScreen.id = 'calc-screen';

  calculator?.prepend(calculatorScreen);

  // Get the display from calculator
  const display = document.querySelector<HTMLDivElement>('#calc-screen');

  // Add inital buttons
  calculator?.appendChild(getBasicButtons(display));

  // Handle calculator mode switching

  modeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // @ts-ignore
      const mode = event.target?.innerText;

      console.log(mode);

      // Add active class to the selected mode
      modeButtons.forEach((button) => {
        button.classList.remove('active');
      });

      // @ts-ignore
      event.target.classList.add('active');

      // add the mode class to the calculator
      calculator!.classList.remove(
        'basic',
        'scientific',
        'programming',
        'trigonometry'
      );

      // Add class to the calculator for the selected mode
      calculator!.classList.add(mode.toLowerCase());

      calculator?.appendChild(getBasicButtons(display));
    });
  });
});

function getBasicButtons(display: HTMLDivElement | null) {
  let childButtonsBasic = [
    'AC',
    '(',
    ')',
    '^',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '/',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '=',
    '+',
  ];

  let basicButtons = document.createElement('div');
  basicButtons.classList.add('calc-buttons');
  childButtonsBasic.forEach((button) => {
    let buttonElement = document.createElement('button');
    buttonElement.classList.add('calc-button');

    if (button === 'AC' || button === '(' || button === ')') {
      buttonElement.classList.add('calc-button-top');
    } else if (
      button === '^' ||
      button === '*' ||
      button === '/' ||
      button === '-' ||
      button === '+' ||
      button === '='
    ) {
      buttonElement.classList.add('calc-button-op');
    }

    // Add event listener to each button
    buttonElement.addEventListener('click', (event) => {
      // Get the value from the button
      // @ts-ignore
      const value = event.target?.innerText;

      // Check if the value is an operator
      if (value === 'AC') {
        display!.innerText = '';
      } else if (value === '=') {
        // Calculate the expression
        try {
          display!.innerText = mexp.eval(display!.innerText);
        } catch (e) {
          display!.innerText = `Error`;
          console.log(e);
        }
      } else {
        // Append the value to the display
        display!.innerText += value;
      }
    });

    buttonElement.innerText = button;
    basicButtons.appendChild(buttonElement);
  });

  return basicButtons;
}
