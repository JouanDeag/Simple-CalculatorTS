import functionPlot from 'function-plot';
import * as math from './math';

export function graph(func: string, derive: boolean) {
  const graphingArea = document.querySelector<HTMLDivElement>('#graphing-area');

  if (graphingArea) {
    graphingArea.innerHTML = '';

    const graph = document.createElement('div');
    graph.classList.add('graph');
    graph.id = 'graph';

    graphingArea.appendChild(graph);

    if (derive) {
      let drv = math.derivative(func, 'x').toString();
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
