import sanitizer from 'sanitize-html';

import { Point } from '../hooks/useCharts';

interface ValidationProps {
  maximum: number;
  minimum: number;
  frequency: number;
  intervalS: number;
}

interface LimitsParams {
  min: number;
  max: number;
  range: number;
  midRange: number;
}

interface QuartilesParams {
  lower: number | null;
  upper: number | null;
  interRange: number | null;
  midhinge: number | null;
}

type Dict = { [key: number]: number };

interface DispersalParams {
  variance: number | null;
  standardDeviation: number | null;
}

interface RandomListProps extends ValidationProps {}

class Utils {
  capitalizeAllAndTrim(text: string): string {
    const textArray = text.trim().toLowerCase().replace(/\s+/g, ' ').split(' ');

    const result = textArray.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    );

    return result.join(' ');
  }

  sanitizeHtml(data: any): any {
    if (typeof data !== 'object') return;

    data = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value !== 'string') {
          return [key, value];
        }

        return [key, sanitizer(value)];
      })
    );

    return data;
  }

  hasNumberValidationError(props: ValidationProps): string {
    const { maximum, minimum, frequency, intervalS } = props;
    let message = '';
    if (maximum <= minimum) {
      message = 'Maximum must be greater then minimum';
    }

    if (Math.round(frequency * intervalS) === 0) {
      message = 'At least one point in the chart';
    }

    return message;
  }

  generateRandomList(props: RandomListProps): number[] {
    const { maximum, minimum, frequency, intervalS } = props;

    const points = this.getTotalPoints(frequency, intervalS);
    let randomArray = Array(points).fill(0);

    randomArray = randomArray.map(() =>
      this.createNumberBetween(minimum, maximum)
    );

    return randomArray;
  }

  createNumberBetween(min: number, max: number): number {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    return randomNumber;
  }

  generateTimestamp(frequency: number, interval: number): number[] {
    const points = this.getTotalPoints(frequency, interval);
    const intervalPerPoint = interval / frequency / interval;

    let timeArray = Array(points).fill(0);

    timeArray = timeArray.map((item, i) => {
      if (i === 0) {
        return Number(intervalPerPoint.toFixed(3));
      }

      return Number(((i + 1) * intervalPerPoint).toFixed(3));
    });

    return timeArray;
  }

  getTotalPoints(frequency: number, interval: number): number {
    const points = Math.round(frequency * interval);

    return points;
  }

  getOrder(list: number[]): number[] {
    const aux = [...list];
    return aux.sort((a, b) => a - b);
  }

  getLimitsParams(list: number[]): LimitsParams {
    const max = Math.max(...list);
    const min = Math.min(...list);
    const range = max - min;
    const midRange = Number(((max + min) / 2).toFixed(1));

    const limits = { max, min, range, midRange };

    return limits;
  }

  getArithmeticMean(list: number[]): number {
    const total = list.length;
    const listSum = list.reduce((acc, item) => acc + item, 0);

    const arithmetic = listSum / total;
    return Number(arithmetic.toFixed(2));
  }

  getGeometricMean(list: number[]): number {
    const total = list.length;
    const listProduct = list.reduce((acc, item) => acc * item, 1);

    const geometric = listProduct ** (1 / total);
    return Number(geometric.toFixed(2));
  }

  getQuadraticMean(list: number[]): number {
    const total = list.length;
    const sumQuadratic = list.reduce((acc, item) => acc + item ** 2, 0);

    const quadratic = Math.sqrt(sumQuadratic / total);

    return Number(quadratic.toFixed(2));
  }

  getHarmonicMean(list: number[]): number {
    const total = list.length;
    const sumHarmonic = list.reduce((acc, item) => acc + 1 / item, 0);

    const harmonic = total / sumHarmonic;

    return Number(harmonic.toFixed(2));
  }

  getDispersalParams(list: number[]): DispersalParams {
    const total = list.length;
    if (total === 1) return { variance: null, standardDeviation: null };

    const arithmetic = this.getArithmeticMean(list);
    const deviationArray = list.map(item => item - arithmetic);
    const sum = deviationArray.reduce((acc, item) => item ** 2 + acc, 0);

    const variance = Number((sum / (total - 1)).toFixed(2));
    const standardDeviation = Number(Math.sqrt(variance).toFixed(2));

    const dispersal = {
      variance,
      standardDeviation
    };

    return dispersal;
  }

  getMode(list: number[]): number | string {
    const dict: Dict = {};
    list.forEach(item => {
      if (!dict[item]) {
        dict[item] = 0;
      }
      dict[item] += 1;
    });

    const max = Math.max(...Object.values(dict));
    const filtered = Object.entries(dict).filter(
      ([key, value]) => value === max
    );

    if (filtered.length > 1) {
      return 'None';
    }

    return Number(filtered[0][0]);
  }

  getMedian(list: number[]): number {
    const sortedList = this.getOrder(list);
    const total = sortedList.length;
    const middle = Math.floor(total / 2);
    const median =
      total % 2
        ? sortedList[middle]
        : (sortedList[middle] + sortedList[middle - 1]) / 2;

    return Number(median.toFixed(1));
  }

  getQuartilesParams(list: number[]): QuartilesParams {
    const sortedList = this.getOrder(list);
    const total = sortedList.length;
    if (total <= 2)
      return {
        lower: null,
        upper: null,
        interRange: null,
        midhinge: null
      };
    const middle = Math.floor(total / 2);

    const halfLower = sortedList.slice(0, middle);
    const halfUpper =
      total % 2 ? sortedList.slice(middle + 1) : sortedList.slice(middle);

    const lower = this.getMedian(halfLower);
    const upper = this.getMedian(halfUpper);

    const quartiles = {
      lower,
      upper,
      interRange: Number((upper - lower).toFixed(2)),
      midhinge: Number(((upper + lower) / 2).toFixed(2))
    };

    return quartiles;
  }

  createListPoints(listNumber: number[], listTime: number[]): Point[] {
    const total = listNumber.length;
    const arithmetic = this.getArithmeticMean(listNumber);
    const detourList = listNumber.map(item =>
      Number((item - arithmetic).toFixed(2))
    );
    const freqAbsoluteList = listNumber.map(
      item => listNumber.filter(num => item === num).length
    );
    const freqRelativeList = freqAbsoluteList.map(item => (item / total) * 100);

    let listPoints: Point[] = [];
    listPoints = listTime.map((time, i) => ({
      id: i + 1,
      value: listNumber[i],
      time,
      freqAbsolute: freqAbsoluteList[i],
      freqRelative: Number(freqRelativeList[i].toFixed(2)),
      detour: detourList[i]
    }));

    return listPoints;
  }
}

export default new Utils();
