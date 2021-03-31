import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useState
} from 'react';

import { warning, error } from '../libs/toast';
import api from '../services/api';
import { useLoading } from './useLoading';
import { useLocalStorage } from './useLocalStorage';
import { useUser } from './useUser';

interface ChartProviderProps {
  children: ReactNode;
}

export interface Chart {
  id: string;
  title: string;
  entity: string;
  maximum: number;
  minimum: number;
  frequency: number;
  intervalS: number;
  updatedAt: string;
}

type ChartInput = Omit<Chart, 'id' | 'updatedAt'>;

interface ChartContextData {
  charts: Chart[];
  createChart: (chart: ChartInput) => Promise<void>;
  updateChart: (chart: ChartInput, id: string) => Promise<void>;
  deleteChart: (id: string) => Promise<void>;
  deleteAllChart: () => Promise<void>;
  loading: boolean;
  setRefresh: (number: number) => void;
  refresh: number;
  editChartId: string;
  setEditChartId: (number: string) => void;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

function ChartProvider({ children }: ChartProviderProps): JSX.Element {
  const [editChartId, setEditChartId] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [charts, setCharts] = useLocalStorage<Chart[]>('charts', []);
  const [loading, setLoading] = useLoading();
  const { token } = useUser();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function getCharts(): Promise<void> {
      try {
        const { data } = await api.get('/chart');
        if (refresh > 1) {
          setCharts([...data.reverse()]);
        }

        if (!charts.length && refresh > 0) {
          warning("It's empty, create a new chart");
        }
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

    setLoading(getCharts());
  }, [refresh]);

  async function createChart(chart: ChartInput): Promise<void> {
    const response = await api.post('/chart', chart, config);

    setCharts([response.data, ...charts]);
  }

  async function updateChart(chart: ChartInput, id: string): Promise<void> {
    const response = await api.put(`/chart/${id}`, chart, config);
    const auxCharts = charts.filter(chart => chart.id !== id);

    setCharts([response.data, ...auxCharts]);
  }

  async function deleteChart(id: string): Promise<void> {
    try {
      await api.delete(`/chart/${id}`, config);

      const auxCharts = charts.filter(chart => chart.id !== id);
      setCharts([...auxCharts]);
      if (!auxCharts.length) {
        localStorage.removeItem('charts');
      }
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

  async function deleteAllChart(): Promise<void> {
    try {
      setCharts([]);
      await api.delete('/chart', config);
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
    <ChartContext.Provider
      value={{
        charts,
        createChart,
        updateChart,
        deleteChart,
        deleteAllChart,
        loading,
        setRefresh,
        refresh,
        editChartId,
        setEditChartId
      }}
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
