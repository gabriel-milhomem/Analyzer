import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useState
} from 'react';

import { warning } from '../libs/toast';
import api from '../services/api';
import { useLoading } from './useLoading';
import { useLocalStorage } from './useLocalStorage';

interface AppProviderProps {
  children: ReactNode;
}

interface Charts {
  id: number;
  title: string;
  maximum: number;
  minimum: number;
  frequency: number;
  intervalS: number;
  points: number;
  updatedAt: string;
}

type ChartInput = Omit<Charts, 'id' | 'updatedAt'>;

interface ChartContextData {
  charts: Charts[];
  createChart: (chart: ChartInput) => Promise<void>;
  loading: boolean;
  setRefresh: (num: number) => void;
  refresh: number;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

function ChartProvider({ children }: AppProviderProps): JSX.Element {
  const [refresh, setRefresh] = useState(0);
  const [charts, setCharts] = useLocalStorage<Charts[]>('charts', []);

  const [loading, setLoading] = useLoading();

  console.log(refresh);

  useEffect(() => {
    async function getCharts(): Promise<void> {
      const { data } = await api.get('/chart');
      setCharts([...data].reverse());
      if (data.length === 0) {
        warning("It's empty create new chart");
      }
    }

    setLoading(getCharts());
  }, [refresh]);

  async function createChart(chart: ChartInput): Promise<void> {
    const response = await api.post('/chart', chart);

    setCharts([response.data, ...charts]);
  }

  return (
    <ChartContext.Provider
      value={{ charts, createChart, loading, setRefresh, refresh }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export default ChartProvider;

export function useCharts(): ChartContextData {
  const charts = useContext(ChartContext);

  return charts;
}
