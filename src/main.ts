import buttons from './buttons.json';
import addButtons from './addbuttons';
import { evaluate } from './math';
import { graph, addGraphingArea, removeGraphingArea } from './graphing';

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
  addButtons(buttons.basic, display, calculator);

  // Handle calculator mode switching

  modeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // @ts-ignore
      const mode = event.target?.innerText;

      if (display) {
        display.innerText = '';
      }

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
        'graphing'
      );

      // Add class to the calculator for the selected mode
      calculator!.classList.add(mode.toLowerCase());

      // Remove all buttons
      calculator?.querySelectorAll('.calc-buttons').forEach((button) => {
        button.remove();
      });

      removeGraphingArea();

      // Add correct buttons for mode
      switch (mode) {
        case 'Basic':
          calculator?.appendChild(getButtons(buttons.basic, display));
          break;
        case 'Scientific':
          addButtons(buttons.scientific, display, calculator);
          break;
        case 'Graphing':
          addButtons(buttons.graph, display, calculator, true);
          addGraphingArea();
          graph('exp(0.1x)*x', true);
          break;
      }
      // Fade in buttons
      calculator?.querySelectorAll('.calc-buttons').forEach((button) => {
        button.classList.add('fade-in');
      });
    });
  });
});

function getButtons(buttonSet: string[], display: HTMLDivElement | null) {
  let basicButtons = document.createElement('div');
  basicButtons.classList.add('calc-buttons');
  buttonSet.forEach((button) => {
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

      // Overwrite if error
      if (display?.innerText === 'Error') {
        display.innerText = '';
      }

      // Check if the value is an operator
      switch (value) {
        case 'AC':
          display!.innerText = '';
          break;
        case 'DEL':
          display!.innerText = display!.innerText.slice(0, -1);
          break;
        case '=':
          // Calculate the result
          try {
            // @ts-ignore
            display!.innerText = evaluate(display!.innerText);
          } catch (error) {
            display!.innerText = 'Error';
            console.log(error);
          }
          break;
        default:
          display!.innerText += value;
          break;
      }
    });

    // Add the value (text) to the button
    buttonElement.innerHTML = button;
    basicButtons.appendChild(buttonElement);
  });

  // Return the buttons to be added to the DOM
  return basicButtons;
}
