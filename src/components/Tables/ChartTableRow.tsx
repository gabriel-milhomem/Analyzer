import { MouseEvent } from 'react';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import { useCharts } from '../../hooks';

interface Chart {
  id: string;
  title: string;
  entity: string;
  updatedAt: string;
}

interface ChartRowProps {
  key: string;
  setDisabledDelete: (flag: boolean) => void;
  openModal: () => void;
  chart: Chart;
}

export function ChartTableRow(props: ChartRowProps): JSX.Element {
  const { chart, openModal, setDisabledDelete } = props;
  const { id, title, updatedAt, entity } = chart;
  const { setEditChartId, deleteChart } = useCharts();
  const history = useHistory();
  const date = new Date(updatedAt);

  async function handleEditCell(event: MouseEvent, id: string): Promise<void> {
    event.stopPropagation();
    await setEditChartId(id);
    openModal();
  }

  async function handleDeleteCell(
    event: MouseEvent,
    id: string
  ): Promise<void> {
    event.stopPropagation();
    setDisabledDelete(true);
    await deleteChart(id);
    setDisabledDelete(false);
  }

  return (
    <tr>
      <td onClick={() => history.push(`/dashboard/${id}`)}>
        <BsEye />
      </td>
      <td> {title} </td>
      <td> {entity} </td>
      <td>{new Intl.DateTimeFormat('en-US').format(date)}</td>
      <td onClick={event => handleEditCell(event, id)}>
        <BsPencil />
      </td>
      <td onClick={event => handleDeleteCell(event, id)}>
        <BsTrash className="red-svg" />
      </td>
    </tr>
  );
}
