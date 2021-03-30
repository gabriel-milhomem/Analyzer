import sanitizer from 'sanitize-html';

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
  lower: number;
  upper: number;
  interRange: number;
  midhinge: number;
}

type Dict = { [key: number]: number };

interface DispersalParams {
  variance: number;
  standardDeviation: number;
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
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateTimestamp(frequency: number, interval: number): number[] {
    if (frequency >= 1) {
      return Array.from(Array(interval).keys());
    }

    const points = this.getTotalPoints(frequency, interval);
    const intervalPerPoint = interval / frequency / interval;

    let timeArray = Array(points).fill(0);

    timeArray = timeArray.map((item, i) => {
      if (i === 0) {
        return Number(intervalPerPoint.toFixed(1));
      }

      return Number(((i + 1) * intervalPerPoint).toFixed(1));
    });

    return timeArray;
  }

  getTotalPoints(frequency: number, interval: number): number {
    return Math.round(frequency * interval);
  }

  getOrder(list: number[]): number[] {
    const aux = [...list];
    return aux.sort((a, b) => a - b);
  }

  getLimitsParams(list: number[]): LimitsParams {
    const max = Math.max(...list);
    const min = Math.min(...list);
    const range = max - min;
    const midRange = (max + min) / 2;

    const limits = { max, min, range, midRange };

    return limits;
  }

  getArithmeticMean(list: number[]): number {
    const total = list.length;
    const listSum = list.reduce((acc, item) => acc + item, 0);

    const arithmetic = listSum / total;
    return arithmetic;
  }

  getGeometricMean(list: number[]): number {
    const total = list.length;
    const listProduct = list.reduce((acc, item) => acc * item, 1);

    const geometric = listProduct ** (1 / total);
    return geometric;
  }

  getQuadraticMean(list: number[]): number {
    const total = list.length;
    const sumQuadratic = list.reduce((acc, item) => acc + item ** 2, 0);

    const quadratic = Math.sqrt(sumQuadratic / total);

    return quadratic;
  }

  getHarmonicMean(list: number[]): number {
    const total = list.length;
    const sumHarmonic = list.reduce((acc, item) => acc + 1 / item, 0);

    const harmonic = total / sumHarmonic;

    return harmonic;
  }

  getDispersalParams(list: number[]): DispersalParams {
    const total = list.length;
    const arithmetic = this.getArithmeticMean(list);
    const deviationArray = list.map(item => item - arithmetic);
    const sum = deviationArray.reduce((acc, item) => item ** 2 + acc, 0);
    const variance = sum / (total - 1);

    const dispersal = {
      variance,
      standardDeviation: Math.sqrt(variance)
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

    return filtered[0][0];
  }

  getMedian(list: number[]): number {
    const sortedList = this.getOrder(list);
    const total = sortedList.length;
    const middle = Math.floor(total / 2);
    const median =
      total % 2
        ? sortedList[middle]
        : (sortedList[middle] + sortedList[middle - 1]) / 2;

    return median;
  }

  getQuartilesParams(list: number[]): QuartilesParams {
    const sortedList = this.getOrder(list);
    const total = sortedList.length;
    const middle = Math.floor(total / 2);

    const halfLower = sortedList.slice(0, middle);
    const halfUpper =
      total % 2 ? sortedList.slice(middle + 1) : sortedList.slice(middle);

    const lower = this.getMedian(halfLower);
    const upper = this.getMedian(halfUpper);

    const quartiles = {
      lower,
      upper,
      interRange: upper - lower,
      midhinge: (upper + lower) / 2
    };

    return quartiles;
  }
}

export default new Utils();
