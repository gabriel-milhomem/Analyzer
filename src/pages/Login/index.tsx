import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { SubmitButton } from '../../components';
import { Input, Error } from '../../components/Modals/styles';
import { useToken } from '../../hooks';
import { success } from '../../libs/toast';
import Utils from '../../utils/Utils';
import { Form, Headline, StyledLogin, Column, Logo } from './styles';

export function Login(): JSX.Element {
  let [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const { login } = useToken();
  const history = useHistory();

  async function handleSubmitLogin(event: FormEvent): Promise<void> {
    try {
      setDisabled(true);
      event.preventDefault();

      name = Utils.capitalizeAllAndTrim(name);
      if (name.split(' ').length === 1) {
        setError('Type the full name');
        setDisabled(false);

        return;
      }
      let body = { name, email };
      body = Utils.sanitizeHtml(body);

      await login(body);
      history.push('/');
      success(`Welcome ${name}!`);
    } catch (err) {
      console.error(err);
      setDisabled(false);
      setError('Internal server error');
    }
  }

  return (
    <StyledLogin onSubmit={handleSubmitLogin}>
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
          <Error>
            <p> {error || ''} </p>
          </Error>
          <SubmitButton type="submit" disabled={disabled} isLoading={disabled}>
            {disabled ? '' : 'Login'}
          </SubmitButton>
        </Form>
      </Column>
    </StyledLogin>
  );
}
