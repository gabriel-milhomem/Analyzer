import { ChangeEvent } from 'react';
import { Line } from 'react-chartjs-2';

import { Chart } from '../../hooks/useCharts';
import { Header } from '../Tables/styles';
import { Container } from './styles';

interface GraphicProps {
  chart: Chart;
}

export function Graphic({ chart }: GraphicProps): JSX.Element {
  const { listXTime, listYNumber, entity, minimum, maximum, intervalS } = chart;

  const labelConfig = {
    display: true,
    fontColor: '#363f5f',
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    padding: 20
  };

  function handleClick(event: ChangeEvent): void {
    event.stopPropagation();
  }

  const data = listYNumber?.map((item, i) => ({ x: listXTime[i], y: item }));
  return (
    <>
      <Header>
        <h2> {`${chart.title}'s graphic`} </h2>
      </Header>
      <Container>
        <Line
          data={{
            label: 'Dataset',
            datasets: [
              {
                label: `${entity} x Time`,
                data,
                backgroundColor: '#33cc95',
                borderColor: '#6933ff',
                borderWidth: 1.3,
                lineTension: 0.1,
                fill: false,
                pointBorderWidth: 1,
                pointRadius: 3.5,
                pointHoverRadius: 5,
                pointBorderColor: '#5429cc'
              }
            ]
          }}
          width={780}
          height={520}
          legend={{
            labels: {
              fontColor: '#363f5f',
              fontSize: 14
            }
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              mode: 'single'
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: '#333333'
                  },
                  type: 'linear',
                  distribution: 'linear',
                  scaleLabel: { ...labelConfig, labelString: 'Time (s)' }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: '#333333'
                  },
                  type: 'linear',
                  scaleLabel: { ...labelConfig, labelString: entity }
                }
              ]
            },
            title: {
              display: true,
              text: `Random numbers generate between [${minimum} - ${maximum}] along the ${intervalS} seconds`,
              fontSize: 14,
              fontColor: '#363f5f',
              fontFamily: "'Poppins', sans-serif"
            },
            legend: {
              onClick: handleClick
            }
          }}
        />
      </Container>
    </>
  );
}
