import { useState } from 'react';
import { BsTrash2, BsArrowDown } from 'react-icons/bs';

import { useCharts } from '../../hooks';
import { Chart, Point } from '../../hooks/useCharts';
import { ChartTableRow } from './ChartTableRow';
import { PointTableRow } from './PointTableRow';
import {
  Table,
  Head,
  Body,
  Header,
  RightBox,
  DeleteButton,
  Container,
  ValueButton,
  TimeButton
} from './styles';

interface ChartsTableProps {
  openModal?: () => void;
  isListPoints: boolean;
  chart?: Chart;
}

type Orientation = -1 | 0 | 1;

export function Tables({
  openModal,
  isListPoints,
  chart
}: ChartsTableProps): JSX.Element {
  const [disabledAllDelete, setDisabledAllDelete] = useState(false);
  const [disabledDelete, setDisabledDelete] = useState(false);
  const { deleteAllChart, charts } = useCharts();
  const [time, setTime] = useState<Orientation>(-1);
  const [value, setValue] = useState<Orientation>(0);
  const [listPoints, setListPoints] = useState<Point[] | undefined>(
    chart?.listPoints
  );

  const titlesChart = [
    'Visualize',
    'Title',
    'Entity',
    'Date',
    'Edit',
    'Delete'
  ];

  const titlesPoint = [
    'Point',
    `${chart?.entity}'s value`,
    'Time',
    'Freq. Absolute',
    'Freq. Relative',
    'Deviation'
  ];

  const title = isListPoints ? `${chart?.title}'s table` : 'My Charts';
  const quantity = isListPoints ? listPoints?.length : charts.length;

  function handleValueClick(): void {
    if (time === 0) {
      setValue(value === -1 ? 1 : -1);

      setListPoints([...listPoints!.reverse()]);
      return;
    }

    setTime(0);
    setValue(-1);
    setListPoints(listPoints!.sort((a, b) => a.value - b.value));
  }

  function handleTimeClick(): void {
    if (value === 0) {
      setTime(time === -1 ? 1 : -1);

      setListPoints([...listPoints!.reverse()]);
      return;
    }

    setValue(0);
    setTime(-1);
    setListPoints(listPoints!.sort((a, b) => a.time - b.time));
  }

  return (
    <>
      <Header>
        <h2> {title} </h2>
        <RightBox>
          <h3>{quantity} items</h3>
          {!isListPoints && (
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
          )}
          {isListPoints && (
            <>
              <ValueButton
                type="button"
                value={value}
                onClick={handleValueClick}
              >
                <p> By value </p>
                <BsArrowDown />
              </ValueButton>
              <TimeButton type="button" time={time} onClick={handleTimeClick}>
                <p> By time </p>
                <BsArrowDown />
              </TimeButton>
            </>
          )}
        </RightBox>
      </Header>
      <Container>
        <Table>
          <Head>
            <tr>
              {!isListPoints &&
                titlesChart.map((title, i) => <th key={i}> {title} </th>)}
              {isListPoints &&
                titlesPoint.map((title, i) => <th key={i}> {title}</th>)}
            </tr>
          </Head>
          <Body disabled={disabledDelete} isListPoints={isListPoints}>
            {!isListPoints &&
              charts.map(chart => (
                <ChartTableRow
                  key={chart.id}
                  chart={chart}
                  setDisabledDelete={setDisabledDelete}
                  openModal={openModal!}
                />
              ))}
            {isListPoints &&
              listPoints?.map(point => (
                <PointTableRow key={point.id} point={point} />
              ))}
          </Body>
        </Table>
      </Container>
    </>
  );
}
