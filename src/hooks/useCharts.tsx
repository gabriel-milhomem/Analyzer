import { createContext, ReactNode, useEffect, useContext } from 'react';

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
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

function ChartProvider({ children }: AppProviderProps): JSX.Element {
  const [charts, setCharts] = useLocalStorage<Charts[]>('charts', []);

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    async function getCharts(): Promise<void> {
      const { data } = await api.get('/chart');
      setCharts([...data.charts]);
    }

    setLoading(getCharts());
  }, []);

  async function createChart(chart: ChartInput): Promise<void> {
    const { data } = await api.post('/chart', chart);

    setCharts([data.charts, ...charts]);
  }

  return (
    <ChartContext.Provider value={{ charts, createChart, loading }}>
      {children}
    </ChartContext.Provider>
  );
}

export default ChartProvider;

export function useCharts(): ChartContextData {
  const charts = useContext(ChartContext);

  return charts;
}
