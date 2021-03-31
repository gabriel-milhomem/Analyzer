import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import { useCharts } from '../../hooks';
import { success } from '../../libs/toast';
import Utils from '../../utils/Utils';
import { SubmitButton } from '../SubmitButton';
import { Title, Input, Error, Form } from './styles';

interface ChartModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

Modal.setAppElement('#root');

export function ChartModal({
  isOpen,
  onModalClose
}: ChartModalProps): JSX.Element {
  const { createChart, charts, editChartId, updateChart } = useCharts();
  const [title, setTitle] = useState('');
  const [entity, setEntity] = useState('');
  const [error, setError] = useState('');
  const [maximum, setMaximum] = useState(NaN);
  const [minimum, setMinimum] = useState(NaN);
  const [frequency, setFrequency] = useState(NaN);
  const [intervalS, setIntervalS] = useState(NaN);
  const [disabled, setDisabled] = useState(false);

  const headline = !editChartId ? 'Create a new chart' : 'Edit your chart';
  const successMsg = !editChartId ? 'created' : 'edited';

  useEffect(() => {
    if (editChartId) {
      const chart = charts.find(chart => chart.id === editChartId)!;
      const { title, maximum, minimum, frequency, intervalS, entity } = chart;
      setTitle(title);
      setEntity(entity);
      setMaximum(maximum);
      setMinimum(minimum);
      setFrequency(frequency);
      setIntervalS(intervalS);
    }
  }, [editChartId]);

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

      let data = {
        title: Utils.capitalizeAllAndTrim(title),
        entity: Utils.capitalizeAllAndTrim(entity),
        maximum,
        minimum,
        frequency,
        intervalS
      };

      data = Utils.sanitizeHtml(data);

      editChartId
        ? await updateChart(data, editChartId)
        : await createChart(data);

      onModalClose();
      success(`Chart successfully ${successMsg}!`);
      reset();
    } catch (err) {
      console.error(err);
      setDisabled(false);
      const status = err.response.status;
      const message = err.response.data.message;

      if (status === 401) {
        setError(message);
      }

      setError('Internal server error');
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

    const integerValue = !value ? NaN : Number(value);

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
    setEntity('');
  };

  return (
    <Modal
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onModalClose}
    >
      <Title> {headline} </Title>
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
          type="text"
          value={entity}
          onChange={event => setEntity(event.target.value)}
          placeholder="Entity name (y-axis)"
          pattern="^[A-z\u00C0-\u00ff ]+$"
          title="Must be only letters"
          width="100%"
          required
        />
        <Input
          type="number"
          value={handleValue(maximum)}
          onChange={event => handleOnChangeNumber(event, 'maximum')}
          placeholder="Maximum"
          width="48%"
          min="1"
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
          min="1"
          required
        />
        <Input
          type="number"
          value={handleValue(frequency)}
          onChange={event => handleOnChangeNumber(event, 'frequency')}
          placeholder="Frequency"
          width="48%"
          min="0"
          step="0.1"
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
