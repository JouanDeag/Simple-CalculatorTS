import functionPlot from 'function-plot';
import { derivative } from './math';

export function graph(func: string, derive: boolean) {
  const graphingArea = document.querySelector<HTMLDivElement>('#graphing-area');

  if (graphingArea) {
    graphingArea.innerHTML = '';

    const graph = document.createElement('div');
    graph.classList.add('graph');
    graph.id = 'graph';

    graphingArea.appendChild(graph);

    if (derive) {
      let drv = derivative(func, 'x').toString();
      const deriveOptions = {
        target: '#graph',
        data: [
          {
            fn: func,
            color: '#ffffff',
            derivative: {
              fn: drv,
              updateOnMouseMove: true,
            },
          },
        ],
        grid: true,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
      };
      functionPlot(deriveOptions);
    } else {
      const graphOptions = {
        target: '#graph',
        data: [
          {
            fn: func,
            color: '#ffffff',
          },
        ],
        grid: true,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
      };
      functionPlot(graphOptions);
    }
  }
}
export function addGraphingArea() {
  const graphingArea = document.createElement('div');
  graphingArea.classList.add('graphing-area');
  graphingArea.id = 'graphing-area';
  document.querySelector('.calc-wrapper')?.appendChild(graphingArea);
}

export function removeGraphingArea() {
  document.querySelector('.graphing-area')?.remove();
  document.getElementById('graph')?.replaceChildren();
}

export function getGraphingButtons(
  buttons: string[],
  display: HTMLDivElement | null
) {
  let graphingButtons = document.createElement('div');
  graphingButtons.classList.add('calc-buttons');
  buttons.forEach((button) => {
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
        case '=':
          // Calculate the expression
          try {
            graph(display!.innerText, false);
          } catch (error) {
            display!.innerText = 'Error';
            console.log(error);
          }
          break;
        case 'DEL':
          // Delete the last character as well as prevent erros when trying to delete empty string
          display!.innerText =
            display!.innerText.length > 0
              ? display!.innerText.slice(0, -1)
              : '';
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
      }
    });

    // Add the value (text) to the button
    buttonElement.innerText = button;
    graphingButtons.appendChild(buttonElement);
  });

  // Return the buttons to be added to the DOM
  return graphingButtons;
}
