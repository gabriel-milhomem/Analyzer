import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import { Chart } from '../../hooks/useCharts';
import Utils from '../../utils/Utils';
import { InfoSection, Subtitle, InfoTitle, List } from './styles';

Modal.setAppElement('#root');

interface InfoModalProps {
  isOpen: boolean;
  onModalClose: () => void;
  chart: Chart;
  listYNumber: number[];
}

export function InfoModal(props: InfoModalProps): JSX.Element | null {
  const { isOpen, onModalClose, chart, listYNumber } = props;
  const { frequency, intervalS, title } = chart;
  if (!listYNumber.length) return null;

  const order = Utils.getOrder(listYNumber).join(', ');
  const { variance, standardDeviation } = Utils.getDispersalParams(listYNumber);
  const { max, min, range, midRange } = Utils.getLimitsParams(listYNumber);
  const { lower, upper, interRange, midhinge } = Utils.getQuartilesParams(
    listYNumber
  );
  const [points, geometric, quadratic, harmonic, arithmetic, mode, median] = [
    Utils.getTotalPoints(frequency, intervalS),
    Utils.getGeometricMean(listYNumber),
    Utils.getQuadraticMean(listYNumber),
    Utils.getHarmonicMean(listYNumber),
    Utils.getArithmeticMean(listYNumber),
    Utils.getMode(listYNumber),
    Utils.getMedian(listYNumber)
  ];

  const outputs = {
    'Total of points': points,
    'Max. Number': max,
    'Min. Number': min,
    Range: range,
    'Mid-Range': midRange.toFixed(1),
    Mode: mode,
    Median: median.toFixed(1),
    'Arithmetic Mean': arithmetic.toFixed(2),
    'Geometric Mean': geometric.toFixed(2),
    'Quadratic Mean': quadratic.toFixed(2),
    'Harmonic Mean': harmonic.toFixed(2),
    Variance: variance.toFixed(2),
    'Standard Deviation': standardDeviation.toFixed(2),
    'Lower quartile': lower.toFixed(1),
    'Upper quartile': upper.toFixed(1),
    'Interquartile Range': interRange.toFixed(1),
    Midhinge: midhinge.toFixed(2),
    Order: order
  };

  const inputsAllowed = [
    'entity',
    'maximum',
    'minimum',
    'frequency',
    'intervalS'
  ];
  const inputs = Object.entries(chart).filter(([key]) => {
    return inputsAllowed.includes(key);
  });

  return (
    <Modal
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onModalClose}
    >
      <InfoSection>
        <InfoTitle> {title} </InfoTitle>
        <button
          type="button"
          className="react-modal-close"
          onClick={onModalClose}
        >
          <img src={closeImg} alt="close icon" />
        </button>
        <hr />
        <Subtitle> Inputs </Subtitle>
        <List>
          {inputs.map(([key, value]) => {
            return (
              <li key={key}>
                <span>{Utils.capitalizeAllAndTrim(key)}</span>
                <p>{value}</p>
              </li>
            );
          })}
        </List>
        <hr />
        <Subtitle> Outputs </Subtitle>
        <List>
          {Object.entries(outputs).map(([key, value], i, array) => {
            return (
              <li key={key}>
                <span> {key} </span>
                <p className={i === array.length - 1 ? 'order' : undefined}>
                  {value}
                </p>
              </li>
            );
          })}
        </List>
      </InfoSection>
    </Modal>
  );
}
