import print from '../stdout/print';
import refresh from '../stdout/refresh';
import formatTimeSpent from './formatTimeSpent';

export interface QueueProcessor {
  (data: any, index?: number, total?: number): any;
}

export class JobQueue {
  topic?: string;
  concurrency: number;
  sequence: any[];
  processor: QueueProcessor;

  constructor(topic?: string) {
    this.topic = topic;
    this.concurrency = 1;
    this.sequence = [];
    this.processor = () => {};
  }

  load(sequence: any[], concurrency?: number) {
    this.concurrency =
      typeof concurrency === 'number' ? Math.max(1, concurrency) : 1;
    this.sequence = Array.isArray(sequence) ? sequence : [];
  }

  program(processor: QueueProcessor) {
    this.processor = processor;
  }

  async exec() {
    const queue = chunk(this.sequence, this.concurrency);

    const dataLength = this.sequence.length;

    const startAt = performance.now();

    print(`✨ ${this.topic ?? 'Execute jobs by queue...'}`, true);

    refresh(
      `<color code="notice">[RUNNING]</color> <progress value="0/${dataLength}" />`,
      true
    );

    await queue.reduce(
      async (acc: number | Promise<number>, item: any | any[]) => {
        const complete = await Promise.resolve(acc);
        const itemSize = Array.isArray(item) ? item.length : 1;

        try {
          await Promise.all(
            item.map((x: any, i: number) =>
              this.processor(x, complete + i, dataLength)
            )
          );
        } catch (e) {}

        refresh(
          `<color code="notice">[RUNNING]</color> <progress value="${
            complete + itemSize
          }/${dataLength}" />`,
          true
        );

        return complete + itemSize;
      },
      0
    );

    refresh('');

    print(`✨ Done in ${formatTimeSpent(performance.now() - startAt)}.`, true);
  }
}

export default JobQueue;

function chunk(arr: any[], size: number) {
  const list: any[] = [];

  const length = Math.ceil(arr.length / size);
  for (let i = 0; i < length; i++) {
    list[i] = arr.slice(size * i, size * (i + 1));
  }

  return list;
}
