import { createContext, ReactNode, useContext } from 'react';

import { UnauthorizedError } from '../errors';
import { error } from '../libs/toast';
import Server from '../utils/Server';
import { useLocalStorage } from './useLocalStorage';

interface UserProviderProps {
  children: ReactNode;
}

export interface UserInput {
  name: string;
  email: string;
}

interface UserContextData {
  token: string;
  login: (user: UserInput) => Promise<void>;
  logout: () => Promise<void>;
}

export interface Config {
  headers?: {
    Authorization?: string;
  };
}

const UserContext = createContext<UserContextData>({} as UserContextData);

function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [token, setToken] = useLocalStorage<string>('user', '');
  const config: Config = { headers: { Authorization: `Bearer ${token}` } };

  async function login(user: UserInput): Promise<void> {
    const data = await Server.postLogin(user);

    setToken(data);
  }

  async function logout(): Promise<void> {
    try {
      setToken('');
      await Server.postLogout(config);
    } catch (err) {
      console.error(err);
      if (err instanceof UnauthorizedError) {
        error(err.message);
        return;
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

export function useToken(): UserContextData {
  const user = useContext(UserContext);

  return user;
}
