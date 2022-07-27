import get from 'lodash/get';
import has from 'lodash/has';

export const parseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.toString();
  }

  if (has(error, 'message')) {
    return get(error, 'message');
  }

  return String(error);
};
