import shortid from 'shortid';

import { NotFoundError, UnauthorizedError } from '../errors';
import { Chart, ChartInput } from '../hooks/useCharts';
import { UserInput, Config } from '../hooks/useToken';
import Utils from './Utils';

class Server {
  middleware(req: any): void {
    const errorMessage = 'User is not authenticate';
    const header = req.headers.Authorization;

    if (!header) {
      throw new UnauthorizedError(errorMessage);
    }

    const token: string = header.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError(errorMessage);
    }
  }

  timeout(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async postLogin(body: UserInput): Promise<string> {
    await this.timeout(500);
    const token = btoa(body.email);

    return token;
  }

  async postLogout(configs: Config): Promise<void> {
    await this.timeout(100);
    await this.middleware(configs);
    localStorage.clear();
  }

  async postChart(body: ChartInput, configs: Config): Promise<Chart> {
    await this.timeout(500);
    await this.middleware(configs);

    const { maximum, minimum, frequency, intervalS } = body;

    const listYNumber = Utils.generateRandomList({
      maximum,
      minimum,
      frequency,
      intervalS
    });
    const listXTime = Utils.generateTimestamp(frequency, intervalS);
    const listPoints = Utils.createListPoints(listYNumber, listXTime);

    const data: Chart = {
      ...body,
      updatedAt: new Date().toJSON(),
      id: shortid.generate(),
      listYNumber,
      listXTime,
      listPoints
    };

    return data;
  }

  async getCharts(configs: Config): Promise<Chart[]> {
    await this.timeout(500);
    await this.middleware(configs);
    const storage = localStorage.getItem('charts');
    const data: Chart[] = JSON.parse(storage ?? '[]');

    return data;
  }

  async putChart(
    body: ChartInput,
    id: string,
    configs: Config
  ): Promise<Chart> {
    await this.timeout(400);
    await this.getOneChart(id, configs);
    await this.middleware(configs);
    const data: Chart = {
      ...body,
      updatedAt: new Date().toJSON(),
      id
    };

    return data;
  }

  async getOneChart(id: string, configs: Config): Promise<Chart> {
    await this.timeout(200);
    await this.middleware(configs);
    const storage = localStorage.getItem('charts');
    const parsed: Chart[] = JSON.parse(storage ?? '[]');
    const data = parsed.find(chart => chart.id === id);

    if (!data) {
      throw new NotFoundError('Chart');
    }

    return data!;
  }

  async deleteOneChart(
    id: string,
    charts: Chart[],
    configs: Config
  ): Promise<Chart[]> {
    await this.timeout(400);
    await this.middleware(configs);
    await this.getOneChart(id, configs);
    const auxCharts = charts.filter(chart => chart.id !== id);

    if (!auxCharts.length) {
      localStorage.removeItem('charts');
    }

    return auxCharts;
  }

  async deleteAll(configs: Config): Promise<void> {
    await this.timeout(500);
    await this.middleware(configs);
    localStorage.removeItem('charts');
  }
}

export default new Server();
