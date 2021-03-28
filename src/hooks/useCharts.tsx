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
  updateChart: (chart: ChartInput, id: number) => Promise<void>;
  loading: boolean;
  setRefresh: (number: number) => void;
  refresh: number;
  editChartId: number;
  setEditChartId: (number: number) => void;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

function ChartProvider({ children }: AppProviderProps): JSX.Element {
  const [editChartId, setEditChartId] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [charts, setCharts] = useLocalStorage<Charts[]>('charts', []);

  const [loading, setLoading] = useLoading();

  console.log(refresh);

  useEffect(() => {
    async function getCharts(): Promise<void> {
      try {
        const { data } = await api.get('/chart');
        setCharts([...data].reverse());
        if (data.length === 0) {
          warning("It's empty create new chart");
        }
      } catch (err) {
        console.error(err);
        error(err.response.data.error);
      }
    }

    setLoading(getCharts());
  }, [refresh]);

  async function createChart(chart: ChartInput): Promise<void> {
    const response = await api.post('/chart', chart);

    setCharts([response.data, ...charts]);
  }

  async function updateChart(chart: ChartInput, id: number): Promise<void> {
    const response = await api.put(`/chart/${id}`, chart);
    const auxCharts = charts.filter(chart => chart.id !== id);
    setCharts([response.data, ...auxCharts]);
  }

  return (
    <ChartContext.Provider
      value={{
        charts,
        createChart,
        updateChart,
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
