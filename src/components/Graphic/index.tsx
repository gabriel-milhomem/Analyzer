import { Chart } from '../../hooks/useCharts';
import { Header } from '../Tables/styles';

interface GraphicProps {
  chart: Chart;
}

export function Graphic({ chart }: GraphicProps): JSX.Element {
  console.log('alou');
  return (
    <Header>
      <h2> {`${chart.title}'s graphic`} </h2>
    </Header>
  );
}
