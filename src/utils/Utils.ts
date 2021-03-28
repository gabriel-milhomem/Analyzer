import { stripHtml } from 'string-strip-html';

interface ValidationProps {
  maximum: number;
  minimum: number;
  frequency: number;
  intervalS: number;
}

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

        return [key, stripHtml(value).result];
      })
    );

    return data;
  }

  hasNumberValidationError(props: ValidationProps): string {
    const { maximum, minimum, frequency, intervalS } = props;
    let message: string = '';
    if (maximum <= minimum) {
      message = 'Maximum must be greater then minimum';
    }

    if (Math.round(frequency * intervalS) === 0) {
      message = 'At least one point in the chart';
    }

    return message;
  }
}

export default new Utils();
