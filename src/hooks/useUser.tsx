import { createContext, ReactNode, useContext } from 'react';

import { error } from '../libs/toast';
import api from '../services/api';
import { useLocalStorage } from './useLocalStorage';

interface UserProviderProps {
  children: ReactNode;
}

interface UserInput {
  name: string;
  email: string;
}

interface UserContextData {
  token: string;
  login: (user: UserInput) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [token, setToken] = useLocalStorage<string>('user', '');

  async function login(user: UserInput): Promise<void> {
    const response = await api.post('/login', user);

    setToken(response.data);
  }

  async function logout(): Promise<void> {
    try {
      setToken('');
      await api.post('/logout');
    } catch (err) {
      console.error(err);
      const status = err.response.status;
      const message = err.response.data.message;

      if (status === 401) {
        error(message);
      }

      error('Internal server error');
    }
  }

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export function useUser(): UserContextData {
  const user = useContext(UserContext);

  return user;
}
