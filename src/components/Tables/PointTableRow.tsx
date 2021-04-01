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
      <td> {`${time.toFixed(2)}s`} </td>
      <td> {freqAbsolute} </td>
      <td> {`${freqRelative.toFixed(2)}%`} </td>
      <td className={detour >= 0 ? 'green' : 'red'}> {detour.toFixed(2)} </td>
    </tr>
  );
}
