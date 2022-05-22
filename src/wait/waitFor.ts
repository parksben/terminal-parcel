import print from '../stdout/print';

export interface WaitForCondition {
  (): boolean;
}

export interface WaitForOptions {
  timeout?: number;
  timeoutMsg?: string;
  interval?: number;
}

export default function waitFor(
  condition: WaitForCondition,
  options: WaitForOptions
) {
  const judge = typeof condition === 'function' ? condition : () => false;
  const {
    timeout = 5000,
    timeoutMsg = '<color code="warning">[TIMEOUT]</color> waiting timeout...',
    interval = 500,
  } = options || {};

  return new Promise((resolve, reject) => {
    let isTimeout = false;

    const timeoutId = setTimeout(() => {
      isTimeout = true;
    }, timeout);

    const intervalId = setInterval(async () => {
      if (isTimeout) {
        print(timeoutMsg, true);
        clearInterval(intervalId);
        resolve(false);
      }

      const flag = await Promise.resolve(judge()).catch((e: Error) => {
        print(`<color code="error">[ERROR]</color> ${e}`, true);

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        clearInterval(intervalId);
        reject(e);
      });

      if (flag) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        clearInterval(intervalId);
        resolve(true);
      }
    }, interval);
  });
}
