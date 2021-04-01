import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useState
} from 'react';

import { NotFoundError, UnauthorizedError } from '../errors';
import { warning, error } from '../libs/toast';
import Server from '../utils/Server';
import { useLoading } from './useLoading';
import { useLocalStorage } from './useLocalStorage';
import { useToken, Config } from './useToken';

interface ChartProviderProps {
  children: ReactNode;
}

export interface Point {
  id: number;
  value: number;
  time: number;
  freqAbsolute: number;
  freqRelative: number;
  detour: number;
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
  listYNumber: number[];
  listXTime: number[];
  listPoints: Point[];
}

export type ChartInput = Omit<Chart, 'id' | 'updatedAt'>;

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
  const { token } = useToken();

  const config: Config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return;
    async function getCharts(): Promise<void> {
      try {
        const data = await Server.getCharts(config);
        if (refresh > 1) {
          setCharts([...data.reverse()]);
        }

        if (!charts.length && refresh > 0) {
          warning("It's empty, create a new chart");
        }
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          error(err.message);
          return;
        }

        error('Internal server error');
      }
    }

    setLoading(getCharts());
  }, [refresh]);

  async function createChart(chart: ChartInput): Promise<void> {
    const data = await Server.postChart(chart, config);

    setCharts([data, ...charts]);
  }

  async function updateChart(chart: ChartInput, id: string): Promise<void> {
    const data = await Server.putChart(chart, id, config);
    const auxCharts = charts.filter(chart => chart.id !== id);

    setCharts([data, ...auxCharts]);
  }

  async function deleteChart(id: string): Promise<void> {
    try {
      const auxCharts = await Server.deleteOneChart(id, charts, config);

      setCharts([...auxCharts]);
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundError) {
        error(err.message);
        return;
      }
      if (err instanceof UnauthorizedError) {
        error(err.message);
        return;
      }

      error('Internal server error');
    }
  }

  async function deleteAllChart(): Promise<void> {
    try {
      setCharts([]);
      await Server.deleteAll(config);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        error(err.message);
        return;
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
