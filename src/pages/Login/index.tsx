import { useState } from 'react';

import { Input, Error } from '../../components/Modals/styles';
import { SubmitButton } from '../../components/SubmitButton';
import { Form, Headline, StyledLogin, Column, Logo } from './styles';

export function Login(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled] = useState(false);
  const [error] = useState('');

  return (
    <StyledLogin>
      <Column>
        <Logo> analyzer </Logo>
        <Headline> generate. view. study. </Headline>

        <Form>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
            pattern="^[A-z\u00C0-\u00ff ]+$"
            title="Must be only letters"
            width="100%"
            required
            autoFocus
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
            width="100%"
            required
          />
          <Error> {error || ''} </Error>
          <SubmitButton type="submit" disabled={disabled} isLoading={disabled}>
            {disabled ? '' : 'Login'}
          </SubmitButton>
        </Form>
      </Column>
    </StyledLogin>
  );
}
