import { z } from 'zod';

export function parseOrThrow<T>(
  schema: z.ZodType<T>,
  data: unknown,
  context: string
): T {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  const first = result.error.issues[0];
  const path = first?.path?.length ? first.path.join('.') : '(root)';
  throw new Error(`Invalid ${context} response: ${path} — ${first.message}`);
}
