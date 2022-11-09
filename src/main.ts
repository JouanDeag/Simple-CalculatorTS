// Import the math module
import mexp from 'math-expression-evaluator';
import { derivative as drv } from 'mathjs';
import functionPlot from 'function-plot';

let basicButtons = [
  'AC',
  '(',
  ')',
  'DEL',
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

let scientificButtons = [
  'AC',
  '(',
  ')',
  'DEL',
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
  '.',
  '0',
  'pi',
  '+',
  'sin',
  'cos',
  'tan',
  'log',
  'ln',
  '√',
  'x²',
  'x³',
  'xⁿ',
  'e',
  '!',
  '=',
];

let programmingButtons = [
  'AC',
  'DEL',
  '0',
  '1',
  '-',
  '+',
  '=',
  'AND',
  'OR',
  'XOR',
  'NOT',
  'NOR',
  'NAND',
];

let graphingButtons = [
  'AC',
  'DEL',
  '(',
  ')',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '-',
  '+',
  '=',
  'x',
  'exp',
  'sin',
  'cos',
  'tan',
  'log',
  'ln',
  'root',
  'graph',
  'derive',
];

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
  calculator?.appendChild(getButtons(basicButtons, display));

  // Handle calculator mode switching

  modeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // @ts-ignore
      const mode = event.target?.innerText;

      console.log(mode);

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
          calculator?.appendChild(getButtons(basicButtons, display));
          break;
        case 'Scientific':
          calculator?.appendChild(getButtons(scientificButtons, display));
          break;
        case 'Programming':
          calculator?.appendChild(getButtons(programmingButtons, display));
          break;
        case 'Graphing':
          calculator?.appendChild(getButtons(graphingButtons, display));
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
      } else if (value === 'DEL') {
        // Delete the last character as well as prevent erros when trying to delete empty string
        display!.innerText =
          display!.innerText.length > 0 ? display!.innerText.slice(0, -1) : '';
      } else {
        // Append the value to the display
        display!.innerText += value;
      }
    });

    // Add the value (text) to the button
    buttonElement.innerText = button;
    basicButtons.appendChild(buttonElement);
  });

  // Return the buttons to be added to the DOM
  return basicButtons;
}

function addGraphingArea() {
  const graphingArea = document.createElement('div');
  graphingArea.classList.add('graphing-area');
  graphingArea.id = 'graphing-area';
  document.querySelector('.calc-wrapper')?.appendChild(graphingArea);
}

function removeGraphingArea() {
  document.querySelector('.graphing-area')?.remove();
}

// function getGraphingButtons(
//   buttons: string[],
//   display: HTMLDivElement | null
// ) {}

function graph(func: string, derive: boolean) {
  const graphingArea = document.querySelector<HTMLDivElement>('#graphing-area');

  if (graphingArea) {
    graphingArea.innerHTML = '';

    const graph = document.createElement('div');
    graph.classList.add('graph');
    graph.id = 'graph';

    graphingArea.appendChild(graph);

    let derivative = drv(func, 'x').toString();

    const graphOptions = {
      target: '#graph',
      data: [
        {
          fn: func,
          color: '#ffffff',
          derivative: {
            fn: derive ? derivative : undefined,
            updateOnMouseMove: true,
          },
        },
      ],
      grid: true,
      yAxis: { domain: [-10, 10] },
      xAxis: { domain: [-10, 10] },
    };

    functionPlot(graphOptions);
  }
}
