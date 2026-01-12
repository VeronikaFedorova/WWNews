import type { Request } from 'express';

export function createRequestSignal(
  req: Request,
  timeoutMs = 10000
): AbortSignal {
  const controller = new AbortController();

  const onClose = () => controller.abort();
  req.on('close', onClose);

  const t = setTimeout(() => controller.abort(), timeoutMs);

  req.res?.once('finish', () => {
    clearTimeout(t);
    req.off('close', onClose);
  });
  req.res?.once('close', () => {
    clearTimeout(t);
    req.off('close', onClose);
  });

  return controller.signal;
}
