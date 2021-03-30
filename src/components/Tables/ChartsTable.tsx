import { useState } from 'react';
import { BsTrash2 } from 'react-icons/bs';
import Loader from 'react-loader-spinner';

import { useCharts } from '../../hooks';
import { ChartTableRow } from './ChartTableRow';
import {
  Table,
  Head,
  Body,
  Container,
  Header,
  RightBox,
  DeleteButton
} from './styles';

interface ChartsTableProps {
  openModal: () => void;
}

export function ChartsTable({
  openModal
}: ChartsTableProps): JSX.Element | null {
  const [disabledAllDelete, setDisabledAllDelete] = useState(false);
  const [disabledDelete, setDisabledDelete] = useState(false);

  const { charts, loading, refresh, deleteAllChart } = useCharts();
  if (!refresh || !charts.length) return null;

  if (loading) {
    return (
      <Container>
        <Loader type="ThreeDots" height={120} width={120} color="#5429cc" />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h2> My Charts </h2>
        <RightBox>
          <h3> {charts.length} itens </h3>
          <DeleteButton
            disabled={disabledAllDelete}
            type="button"
            onClick={async () => {
              setDisabledAllDelete(true);
              await deleteAllChart();
              setDisabledAllDelete(false);
            }}
          >
            <p> Delete all </p>
            <BsTrash2 />
          </DeleteButton>
        </RightBox>
      </Header>
      <Table>
        <Head>
          <tr>
            <th> Visualize </th>
            <th> Title </th>
            <th> Entity </th>
            <th> Date </th>
            <th> Edit </th>
            <th> Delete </th>
          </tr>
        </Head>
        <Body disabled={disabledDelete}>
          {charts.map(chart => (
            <ChartTableRow
              key={chart.id}
              chart={chart}
              setDisabledDelete={setDisabledDelete}
              openModal={openModal}
            />
          ))}
        </Body>
      </Table>
    </Container>
  );
}
