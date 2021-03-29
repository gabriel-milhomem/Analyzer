import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import { InfoSection, Subtitle, InfoTitle, List } from './styles';

Modal.setAppElement('#root');

interface InfoModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

export function InfoModal({
  isOpen,
  onModalClose
}: InfoModalProps): JSX.Element {
  return (
    <Modal
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onModalClose}
    >
      <InfoSection>
        <InfoTitle> Titulo do gráfico </InfoTitle>
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
          <li>
            <span>Entity: </span>
            <p> 34</p>
          </li>
          <li>
            <span>Maximum: </span>
            <p>34</p>
          </li>
          <li>
            <span>Minimum: </span>
            <p>34</p>
          </li>
          <li>
            <span>Frequency: </span>
            <p>34</p>
          </li>
          <li>
            <span>Interval: </span>
            <p>34</p>
          </li>
        </List>
        <hr />
        <Subtitle> Output </Subtitle>
        <List>
          <li>
            <span>Total of points: </span>
            <p>34</p>
          </li>
          <li>
            <span>Max. Number: </span>
            <p>34</p>
          </li>
          <li>
            <span>Min. Number: </span>
            <p>34</p>
          </li>
          <li>
            <span>Amplitude: </span>
            <p>34</p>
          </li>
          <li>
            <span>Mode: </span>
            <p>34</p>
          </li>
          <li>
            <span>Median: </span>
            <p>34</p>
          </li>
          <li>
            <span>Arithmetic average: </span>
            <p>34</p>
          </li>
          <li>
            <span>Variance: </span>
            <p>34</p>
          </li>
          <li>
            <span>Standard deviation: </span>
            <p>34</p>
          </li>
          <li>
            <span>Geometric average </span>
            <p>34</p>
          </li>
          <li>
            <span>Harmonic average: </span>
            <p>34</p>
          </li>
        </List>
      </InfoSection>
    </Modal>
  );
}
