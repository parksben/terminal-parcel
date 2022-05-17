import print from '../stdout/print';

export interface Processor {
  (value: any, index: number, total: number): any;
}

export interface Step {
  index: number;
  description: string;
  processor: Processor;
}

export interface State {
  value: any;
  index: number;
  total: number;
}

export class Workflow {
  topic?: string;
  steps: Step[];
  total: number;

  constructor(topic?: string) {
    this.topic = topic;
    this.steps = [];
    this.total = 0;
  }

  add(description: string, processor: Processor) {
    this.steps.push({
      index: this.total,
      description,
      processor,
    });
    this.total += 1;
  }

  async run() {
    const startAt = performance.now();

    print(
      `<status type="notice">${
        this.topic ?? 'The workflow is running...'
      }</status>`,
      true
    );

    const completion = await this.steps.reduce(
      async (value: any, step: Step, index: number, steps: Step[]) => {
        print(
          `<status type="notice">[${index + 1}/${steps.length}]</status> ${
            step.description
          }`,
          true
        );

        const nextValue = await Promise.resolve(
          step.processor(value, index, steps.length)
        ).catch((e: Error) => {
          print(`<status type="error">[ERROR]</status> ${String(e)}`, true);
          print(
            `<status type="warning">The workflow has exited with the exception, taken ${formatTimeSpent(
              performance.now() - startAt
            )}.</status>`,
            true
          );
          process.exit(-1);
        });

        return { value: nextValue, index: index + 1, total: steps.length };
      },
      undefined
    );

    print(
      `<status type="notice">The workflow has finished, taken ${formatTimeSpent(
        performance.now() - startAt
      )}.</status>`,
      true
    );

    return completion?.value;
  }
}

export default Workflow;

function formatTimeSpent(duration: number) {
  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;

  if (duration < sec) {
    return `${Math.round(duration)}ms`;
  }

  if (duration < min) {
    return `${Math.round((10 * duration) / sec) / 10}s`;
  }

  if (duration < hour) {
    return `${Math.round((10 * duration) / min) / 10} minutes`;
  }

  return `${Math.round((10 * duration) / hour) / 10} hours`;
}
