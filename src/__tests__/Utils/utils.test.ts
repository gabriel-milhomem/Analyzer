import Utils from '../../utils/Utils';

describe('function sanitizeHtml', () => {
  it('It should return the same object, without the html tag /clients route', () => {
    const object = {
      name: '<script> malicius </script>Nome Cliente',
      email: '<script> second </script>Email'
    };

    const expectedObject = {
      name: 'Nome Cliente',
      email: 'Email'
    };

    const result = Utils.sanitizeHtml(object);
    expect(result).toMatchObject(expectedObject);
  });

  it('It should return the same object, without the html tag /products route', () => {
    const object = {
      title: '<script> malicius </script>Title',
      entity: '<script> second </script>Entity',
      maximum: 3,
      minimum: 4,
      frequency: 5,
      intervalS: 7
    };
    const expectedObject = {
      title: 'Title',
      entity: 'Entity',
      maximum: 3,
      minimum: 4,
      frequency: 5,
      intervalS: 7
    };

    const result = Utils.sanitizeHtml(object);
    expect(result).toMatchObject(expectedObject);
  });
});

describe('function capitalizeAllAndTrim', () => {
  it('should return an name capitalized', () => {
    const name = 'FeRnAnDo FeRREIRa';
    const expectedName = 'Fernando Ferreira';

    const result = Utils.capitalizeAllAndTrim(name);

    expect(result).toEqual(expectedName);
  });

  it('should return an name all trim', () => {
    const name = ' fernando   ferreira     gomes  ';
    const expectedName = 'Fernando Ferreira Gomes';

    const result = Utils.capitalizeAllAndTrim(name);

    expect(result).toEqual(expectedName);
  });
});

describe('function hasNumberValidationError', () => {
  it('should return empty message string', () => {
    const [maximum, minimum, frequency, intervalS] = [10, 3, 6, 8];
    const result = Utils.hasNumberValidationError({
      maximum,
      minimum,
      frequency,
      intervalS
    });

    expect(result).toEqual('');
  });

  it('should return error: maximum is less then minimum', () => {
    const [maximum, minimum, frequency, intervalS] = [1, 3, 6, 8];
    const result = Utils.hasNumberValidationError({
      maximum,
      minimum,
      frequency,
      intervalS
    });

    expect(result).toEqual('Maximum must be greater then minimum');
  });

  it('should return error: at least one point', () => {
    const [maximum, minimum, frequency, intervalS] = [5, 3, 0, 8];
    const result = Utils.hasNumberValidationError({
      maximum,
      minimum,
      frequency,
      intervalS
    });

    expect(result).toEqual('At least one point in the chart');
  });
});

describe('function createNumberBetween', () => {
  it('should return an number between', () => {
    const max = 20;
    const min = 1;

    const result = Utils.createNumberBetween(max, min);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe('function getTotalPoints', () => {
  it('should return the total of points', () => {
    const frequency = 12;
    const interval = 12;
    const expected = 144;

    const result = Utils.getTotalPoints(frequency, interval);

    expect(result).toEqual(expected);
  });
});

describe('function generateRandomList', () => {
  it('should return an array of random numbers', () => {
    jest.spyOn(Utils, 'createNumberBetween').mockReturnValueOnce(3);
    const [maximum, minimum, frequency, intervalS] = [10, 1, 0.5, 100];
    const result = Utils.generateRandomList({
      maximum,
      minimum,
      frequency,
      intervalS
    });

    expect(result.length).toBe(50);
    result.forEach(item => {
      expect(item).toBeGreaterThanOrEqual(minimum);
      expect(item).toBeLessThanOrEqual(maximum);
    });
  });
});

describe('function generateTimestamp', () => {
  it('should return an array of timestamp, frequency < 1', () => {
    jest.spyOn(Utils, 'getTotalPoints').mockReturnValueOnce(5);
    const [frequency, interval] = [0.5, 10];
    const expected = [2, 4, 6, 8, 10];

    const result = Utils.generateTimestamp(frequency, interval);

    expect(result).toEqual(expected);
  });

  it('should return an array of timestamp, frequency > 1', () => {
    jest.spyOn(Utils, 'getTotalPoints').mockReturnValueOnce(10);
    const [frequency, interval] = [2, 5];
    const expected = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    const result = Utils.generateTimestamp(frequency, interval);

    expect(result).toEqual(expected);
  });
});

describe('function getOrder', () => {
  it('should return the total of points', () => {
    const list = [2, 5, 4, 7, 6, 1, 3];
    const expected = [1, 2, 3, 4, 5, 6, 7];

    const result = Utils.getOrder(list);

    expect(result).toEqual(expected);
  });
});

describe('function getLimitsParams', () => {
  it('should return the maximum, minimum, range, mid-range', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = {
      max: 34,
      min: 1,
      range: 33,
      midRange: 17.5
    };
    const result = Utils.getLimitsParams(list);

    expect(result).toMatchObject(expected);
  });
});

describe('function getArithmeticMean', () => {
  it('should return the arithmetic mean', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = 7.83;
    const result = Utils.getArithmeticMean(list);

    expect(result).toEqual(expected);
  });
});

describe('function getGeometricMean', () => {
  it('should return the geometric mean', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = 5.05;
    const result = Utils.getGeometricMean(list);

    expect(result).toEqual(expected);
  });
});

describe('function getQuadraticMean', () => {
  it('should return the quadratic mean', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = 11.5;
    const result = Utils.getQuadraticMean(list);

    expect(result).toEqual(expected);
  });
});

describe('function getHarmonicMean', () => {
  it('should return the harmonic mean', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = 3.18;
    const result = Utils.getHarmonicMean(list);

    expect(result).toEqual(expected);
  });
});

describe('function getDispersalParams', () => {
  it('should return the variance and deviation', () => {
    jest.spyOn(Utils, 'getArithmeticMean').mockReturnValueOnce(7.83);
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = {
      variance: 77.24,
      standardDeviation: 8.79
    };
    const result = Utils.getDispersalParams(list);

    expect(result).toMatchObject(expected);
  });

  it('should return all null when is just one point', () => {
    jest.spyOn(Utils, 'getArithmeticMean').mockReturnValueOnce(7.83);
    const list = [2];
    const expected = {
      variance: null,
      standardDeviation: null
    };
    const result = Utils.getDispersalParams(list);

    expect(result).toEqual(expected);
  });
});

describe('function getMode', () => {
  it('should return the mode', () => {
    const list = [2, 4, 6, 9, 9, 5, 7, 9, 1, 10, 34, 1];
    const expected = 9;
    const result = Utils.getMode(list);

    expect(result).toEqual(expected);
  });

  it('should return None when dont have any mode', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = 'None';
    const result = Utils.getMode(list);

    expect(result).toEqual(expected);
  });
});

describe('function getMedian', () => {
  it('should return the median array length=even', () => {
    const list = [2, 4, 6, 9, 9, 5, 7, 9, 1, 10, 34, 1];
    const expected = 6.5;
    const result = Utils.getMedian(list);

    expect(result).toEqual(expected);
  });

  it('should return the median array length=odd', () => {
    const list = [2, 4, 6, 9, 5, 7, 9, 1, 10, 34, 1];
    const expected = 6;
    const result = Utils.getMedian(list);

    expect(result).toEqual(expected);
  });
});

describe('function getQuartilesParams', () => {
  it('should return the lower, upper, interRange and midhinge', () => {
    const list = [2, 4, 6, 9, 6, 5, 7, 9, 1, 10, 34, 1];
    const expected = {
      lower: 3,
      upper: 9,
      interRange: 6,
      midhinge: 6
    };
    const result = Utils.getQuartilesParams(list);

    expect(result).toMatchObject(expected);
  });

  it('should return all null when is length is less then 3', () => {
    const list = [2, 3];
    const expected = {
      lower: null,
      upper: null,
      interRange: null,
      midhinge: null
    };
    const result = Utils.getQuartilesParams(list);

    expect(result).toMatchObject(expected);
  });
});

describe('function createListPoints', () => {
  it('should the list of the points with freq Absolute, Relative and Detour', () => {
    jest.spyOn(Utils, 'getArithmeticMean').mockReturnValueOnce(3);
    const list = [1, 4, 4];
    const time = [1, 2, 3];
    const expected = [
      {
        id: 1,
        value: 1,
        time: 1,
        freqAbsolute: 1,
        freqRelative: 33.33,
        detour: -2
      },
      {
        id: 2,
        value: 4,
        time: 2,
        freqAbsolute: 2,
        freqRelative: 66.67,
        detour: 1
      },
      {
        id: 3,
        value: 4,
        time: 3,
        freqAbsolute: 2,
        freqRelative: 66.67,
        detour: 1
      }
    ];
    const result = Utils.createListPoints(list, time);

    expect(result).toEqual(expected);
  });
});
