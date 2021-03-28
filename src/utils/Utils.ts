import { stripHtml } from 'string-strip-html';

interface validationProps {
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

  sanitizeHtml(data: object): object {
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

  hasNumberValidationError(props: validationProps): string {
    const { maximum, minimum, frequency, intervalS } = props;
    const arrayInput = [maximum, minimum, frequency, intervalS];
    const dispatcherError = [
      {
        test: maximum <= minimum,
        message: 'Maximum must be greater then minimum'
      },
      {
        test: arrayInput.some(value => value.toString().indexOf('.') !== -1),
        message: 'All number fields must be integer'
      }
    ];

    const hasError = dispatcherError.find(input => input.test);

    if (hasError) {
      return hasError.message;
    }

    return '';
  }
}

export default new Utils();
