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
  amplitude: number;
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

    randomArray = randomArray.map(number =>
      this.createNumberBetween(minimum, maximum)
    );

    return randomArray;
  }

  createNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getTotalPoints(frequency: number, interval: number): number {
    return Math.round(frequency * interval);
  }

  generateTimestamp(frequency: number, interval: number): number[] {
    if (frequency >= 1) {
      return Array.from(Array(interval).keys());
    }

    const points = this.getTotalPoints(frequency, interval);
    const intervalPerPoint = Math.round(frequency / interval / frequency);

    let timeArray = Array(points).fill(0);

    timeArray = timeArray.map((item, i) => i * intervalPerPoint);

    return timeArray;
  }

  getLimitsParams(list: number[]): LimitsParams {
    const max = Math.max(...list);
    const min = Math.min(...list);
    const amplitude = Math.abs(max - min);

    const limits = { max, min, amplitude };

    return limits;
  }

  getArithmeticAverage(list: number[]): number {
    const total = list.length;
    const listSum = list.reduce((acc, item) => acc + item, 0);

    const arithmetic = listSum / total;
    return arithmetic;
  }

  getGeometricAverage(list: number[]): number {
    const total = list.length;
    const listProduct = list.reduce((acc, item) => acc * item, 1);

    const geometric = listProduct ** (1 / total);
    return geometric;
  }

  getHarmonicAverage(list: number[]): number {
    const noZeroList = list.filter(item => item !== 0);
    const sumNoZero = noZeroList.reduce((acc, item) => acc + 1 / item, 0);
    const totalNoZero = noZeroList.length;

    const harmonic = totalNoZero / sumNoZero;

    return harmonic;
  }

  getDispersalParams(list: number[]): DispersalParams {
    const total = list.length;
    const arithmetic = this.getArithmeticAverage(list);
    const deviationArray = list.map(item => item - arithmetic);
    const variance =
      deviationArray.reduce((acc, item) => item ** 2 + acc, 0) / total;

    const dispersal = { variance, standardDeviation: Math.sqrt(variance) };

    return dispersal;
  }

  getMode(list: number[]): number {
    const dict: Dict = {};
    list.forEach(item => {
      if (dict[item] === undefined) {
        dict[item] = 0;
      }
      dict[item] += 1;
    });

    const mode = Math.max(...Object.values(dict));

    return mode;
  }

  getMedian(list: number[]): number {
    const sortedList = list.sort((a, b) => a - b);
    const total = sortedList.length;
    const middle = Math.floor(total / 2);
    const median =
      total % 2 === 1
        ? sortedList[middle]
        : (sortedList[middle] + sortedList[middle - 1]) / 2;

    return median;
  }
}

export default new Utils();
