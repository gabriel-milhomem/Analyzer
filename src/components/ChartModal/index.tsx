import { useState } from 'react';
import Modal from 'react-modal';

import { Title, Input, Error, Form } from './styles';
import { SubmitButton } from './SubmitButton';

interface ChartModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

export function ChartModal({
  isOpen,
  onRequestClose
}: ChartModalProps): JSX.Element {
  const [error] = useState('dsfsdf');
  const [disabled] = useState(true);

  return (
    <Modal
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Title> Create a new chart </Title>
      <Form>
        <Input type="text" placeholder="Name" width="100%" />
        <Input type="number" placeholder="Maximum" width="48%" />
        <Input type="number" placeholder="Minimum" width="48%" />
        <Input type="number" placeholder="Frequency" width="48%" />
        <Input type="number" placeholder="Interval (s)" width="48%" />
        <Error>
          <p> {error}</p>
        </Error>
        <SubmitButton type="submit" disabled={disabled} isLoading={disabled}>
          {disabled ? '' : 'Generate'}
        </SubmitButton>
      </Form>
    </Modal>
  );
}
