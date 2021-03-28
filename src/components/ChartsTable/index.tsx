import { BsEye, BsPencil, BsTrash, BsTrash2 } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { useCharts } from '../../hooks/useCharts';
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
  const history = useHistory();
  const {
    charts,
    loading,
    refresh,
    setEditChartId,
    deleteChart,
    deleteAllChart
  } = useCharts();
  if (refresh === 0 || charts.length === 0) return null;

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
          <DeleteButton type="button" onClick={deleteAllChart}>
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
            <th> Points </th>
            <th> Date </th>
            <th> Edit </th>
            <th> Delete </th>
          </tr>
        </Head>
        <Body>
          {charts.map(chart => {
            const { id, title, updatedAt, points } = chart;
            const date = new Date(updatedAt);
            return (
              <tr key={id}>
                <td onClick={() => history.push(`/chart/${id}`)}>
                  <BsEye />
                </td>
                <td> {title} </td>
                <td> {points} </td>
                <td>{Intl.DateTimeFormat('en-US').format(date)}</td>
                <td
                  onClick={async event => {
                    event.stopPropagation();
                    await setEditChartId(id);
                    openModal();
                  }}
                >
                  <BsPencil />
                </td>
                <td
                  onClick={async event => {
                    event.stopPropagation();
                    await deleteChart(id);
                  }}
                >
                  <BsTrash className="red-svg" />
                </td>
              </tr>
            );
          })}
        </Body>
      </Table>
    </Container>
  );
}
