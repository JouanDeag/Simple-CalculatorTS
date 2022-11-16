import { graph } from './graphing';
import { evaluate } from './math';

export default function addButtons(
  buttons: string[],
  display: HTMLDivElement | null,
  calculator: HTMLDivElement | null,
  graphing = false
) {
  let graphingButtons = document.createElement('div');
  graphingButtons.classList.add('calc-buttons');
  buttons.forEach((button) => {
    let buttonElement = document.createElement('button');
    buttonElement.classList.add('calc-button');

    if (button === 'AC' || button === '(' || button === ')') {
      buttonElement.classList.add('calc-button-tops');
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

      console.log(`Button ${value} clicked`);

      // Overwrite if error
      if (display?.innerText === 'Error') {
        display.innerText = '';
      }

      // Check if the value is an operator
      switch (value) {
        case 'AC':
          display!.innerText = '';
          break;
        case '=':
          // Calculate the expression
          try {
            if (graphing) {
              graph(display!.innerText, false);
            } else {
              let toEval = display!.innerText
                .replace('pi', '3.14159265359')
                .replace('e', '2.71828182846');
              display!.innerText = evaluate(toEval).toString();
            }
          } catch (error) {
            display!.innerText = 'Error';
            console.log(error);
          }
          break;
        case 'DEL':
          // Check if the last character is a trigonomtry operator

          // let lastChar = display!.innerText.slice(-1);
          let lastChars = display!.innerText.slice(-4);
          if (
            lastChars === 'sin(' ||
            lastChars === 'cos(' ||
            lastChars === 'tan(' ||
            lastChars === 'log(' ||
            lastChars === 'ln(' ||
            lastChars === 'abs(' ||
            lastChars === 'der(' ||
            lastChars === 'int(' ||
            lastChars === 'sqrt' ||
            lastChars === 'exp('
          ) {
            display!.innerText = display!.innerText.slice(0, -4);
          } else {
            // Delete the last character as well as prevent erros when trying to delete empty string
            display!.innerText =
              display!.innerText.length > 0
                ? display!.innerText.slice(0, -1)
                : '';
          }
          break;
        case 'derive':
          try {
            graph(display!.innerText, true);
          } catch (error) {
            display!.innerText = 'Error';
            console.log(error);
          }
          break;
        default:
          // Append the value to the display
          display!.innerText += value;
          if (value.length > 1 && value !== 'pi') {
            display!.innerText += '(';
          }
          break;
      }
    });

    // Add the value (text) to the button
    buttonElement.innerHTML = button;
    graphingButtons.appendChild(buttonElement);
  });

  // Return the buttons to be added to the DOM
  calculator?.appendChild(graphingButtons);
}
