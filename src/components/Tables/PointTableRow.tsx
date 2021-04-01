import { Point } from '../../hooks/useCharts';

interface PointRowProps {
  key: number;
  point: Point;
}

export function PointTableRow({ point }: PointRowProps): JSX.Element {
  const { id, value, time, freqAbsolute, freqRelative, detour } = point;
  return (
    <tr>
      <td> {`#${id}`} </td>
      <td> {value} </td>
      <td> {`${time}s`} </td>
      <td> {freqAbsolute} </td>
      <td> {`${freqRelative}%`} </td>
      <td className={detour >= 0 ? 'green' : 'red'}> {detour} </td>
    </tr>
  );
}
