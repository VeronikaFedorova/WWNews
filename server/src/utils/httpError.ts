import { AxiosError } from 'axios';
import { Response } from 'express';

export function handleHttpError(
  error: unknown,
  res: Response,
  fallback: string
) {
  if (error instanceof AxiosError) {
    return res
      .status(error.response?.status ?? 500)
      .json(error.response?.data ?? { error: fallback });
  }

  return res.status(500).json({ error: fallback });
}
