import { useState, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import { useCharts } from '../../hooks/useCharts';
import { success } from '../../libs/toast';
import Utils from '../../utils/Utils';
import { Title, Input, Error, Form } from './styles';
import { SubmitButton } from './SubmitButton';

interface ChartModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

Modal.setAppElement('#root');

export function ChartModal({
  isOpen,
  onModalClose
}: ChartModalProps): JSX.Element {
  const { createChart } = useCharts();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [maximum, setMaximum] = useState(NaN);
  const [minimum, setMinimum] = useState(NaN);
  const [frequency, setFrequency] = useState(NaN);
  const [intervalS, setIntervalS] = useState(NaN);
  const [disabled, setDisabled] = useState(false);

  async function handleOnNewChart(event: FormEvent): Promise<void> {
    try {
      setDisabled(true);
      event.preventDefault();

      const hasError = Utils.hasNumberValidationError({
        maximum,
        minimum,
        frequency,
        intervalS
      });

      if (hasError) {
        setError(hasError);
        setDisabled(false);
        return;
      }

      const points = Math.round(intervalS * frequency);
      let data = {
        title: Utils.capitalizeAllAndTrim(title),
        maximum,
        minimum,
        frequency,
        intervalS,
        points
      };

      data = Utils.sanitizeHtml(data);
      createChart(data);

      onModalClose();
      success('Chart successfully created');
      reset();
    } catch (err) {
      console.error(err);
      setDisabled(false);
      setError(err.response.data.error);
    }
  }

  const handleOnChangeNumber = (
    event: ChangeEvent<HTMLInputElement>,
    type: keyof typeof onChangeDispatcher
  ): void => {
    const value = event.target.value;
    const onChangeDispatcher = {
      maximum: setMaximum,
      minimum: setMinimum,
      frequency: setFrequency,
      intervalS: setIntervalS
    };

    const integerValue = value === '' ? NaN : Number(value);

    onChangeDispatcher[type](integerValue);
  };

  const handleValue = (value: number): string => {
    return isNaN(value) ? '' : value.toString();
  };

  const reset = (): void => {
    setTitle('');
    setMaximum(NaN);
    setMinimum(NaN);
    setFrequency(NaN);
    setIntervalS(NaN);
    setDisabled(false);
    setError('');
  };

  return (
    <Modal
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onModalClose}
    >
      <Title> Create a new chart </Title>
      <button
        type="button"
        className="react-modal-close"
        onClick={onModalClose}
      >
        <img src={closeImg} alt="close icon" />
      </button>
      <Form onSubmit={handleOnNewChart}>
        <Input
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          autoFocus
          placeholder="Title"
          pattern="^[\w ]*$"
          title="Must be only alphanumerics"
          width="100%"
          required
        />
        <Input
          type="number"
          value={handleValue(maximum)}
          onChange={event => handleOnChangeNumber(event, 'maximum')}
          placeholder="Maximum"
          width="48%"
          step="1"
          required
        />
        <Input
          type="number"
          value={handleValue(minimum)}
          onChange={event => handleOnChangeNumber(event, 'minimum')}
          placeholder="Minimum"
          width="48%"
          step="1"
          required
        />
        <Input
          type="number"
          value={handleValue(frequency)}
          onChange={event => handleOnChangeNumber(event, 'frequency')}
          placeholder="Frequency"
          width="48%"
          min="0"
          required
        />
        <Input
          type="number"
          value={handleValue(intervalS)}
          onChange={event => handleOnChangeNumber(event, 'intervalS')}
          placeholder="Interval (s)"
          width="48%"
          min="1"
          step="1"
          required
        />
        <Error>
          <p> {error} </p>
        </Error>
        <SubmitButton type="submit" disabled={disabled} isLoading={disabled}>
          {disabled ? '' : 'Generate'}
        </SubmitButton>
      </Form>
    </Modal>
  );
}
