// Import the math module
import mexp from 'math-expression-evaluator';

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  // Get the buttons from calculator
  const buttons = document.querySelectorAll<HTMLButtonElement>('.calc-button');

  // Get the display from calculator
  const display = document.querySelector<HTMLDivElement>('#calc-screen');

  // Add event listener to each button
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
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
  });
});
