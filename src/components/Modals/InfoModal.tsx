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

export function InfoModal(props: InfoModalProps): JSX.Element {
  const { isOpen, onModalClose, chart, listYNumber } = props;
  const { frequency, intervalS, title } = chart;

  const { variance, standardDeviation } = Utils.getDispersalParams(listYNumber);
  const { max, min, amplitude } = Utils.getLimitsParams(listYNumber);
  const [points, geometric, harmonic, arithmetic, mode, median] = [
    Utils.getTotalPoints(frequency, intervalS),
    Utils.getGeometricAverage(listYNumber),
    Utils.getHarmonicAverage(listYNumber),
    Utils.getArithmeticAverage(listYNumber),
    Utils.getMode(listYNumber),
    Utils.getMedian(listYNumber)
  ];

  const outputs = {
    'Total of points': points,
    'Max. Number': max,
    'Min. Number': min,
    Amplitude: amplitude,
    Mode: mode,
    Median: median.toFixed(2),
    'Arithmetic average': arithmetic.toFixed(2),
    'Geometric average': geometric.toFixed(2),
    'Harmonic average': harmonic.toFixed(2),
    Variance: variance.toFixed(2),
    'Standard deviation': standardDeviation.toFixed(2)
  };

  const inputsAllowed = [
    'Entity',
    'Maximum',
    'Minimum',
    'Frequency',
    'Interval'
  ];
  const inputs = Object.entries(chart).filter(([key]) => {
    key = key.charAt(0).toUpperCase();
    if (key === 'IntervalS') key = key.slice(0, -1);
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
        <Subtitle> Input </Subtitle>
        <List>
          {inputs.map(([key, value]) => {
            return (
              <li key={key}>
                <span>{key}</span>
                <p> {value} </p>
              </li>
            );
          })}
        </List>
        <hr />
        <Subtitle> Output </Subtitle>
        <List>
          {Object.entries(outputs).map(([key, value]) => {
            return (
              <li key={key}>
                <span> {key} </span>
                <p> {value} </p>
              </li>
            );
          })}
        </List>
      </InfoSection>
    </Modal>
  );
}
