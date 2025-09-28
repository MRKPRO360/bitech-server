/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // The error response from mongoDB for duplicate error looks like:
  // { ..., keyValue: { name: 'product-name' } }
  // We can extract the field and value from keyValue
  const [[path, value]] = Object.entries(err.keyValue);

  const errorSources: TErrorSources = [
    {
      path: path,
      message: `${value} already exists.`,
    },
  ];

  const statusCode = 409; // 409 Conflict is more suitable for duplicates

  return {
    statusCode,
    message: 'Duplicate Entry',
    errorSources,
  };
};

export default handleDuplicateError;
