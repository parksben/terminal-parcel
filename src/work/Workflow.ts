import print from '../stdout/print';
import formatTimeSpent from './formatTimeSpent';

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

  async start() {
    const startAt = performance.now();

    print(`✨ ${this.topic ?? 'Workflow start...'}`, true);

    const completion = await this.steps.reduce(
      async (value: any, step: Step, index: number, steps: Step[]) => {
        const processorValue = await Promise.resolve(value);

        print(
          `<status type="notice">[${index + 1}/${steps.length}]</status> ${
            step.description
          }`,
          true
        );

        const nextValue = await Promise.resolve(
          step.processor(processorValue, index, steps.length)
        )
          .then((v: any) => v)
          .catch((e: Error) => {
            print(`<status type="error">[ERROR]</status> ${String(e)}`, true);
            process.exit(-1);
          });

        return nextValue;
      },
      undefined
    );

    print(`✨ Done in ${formatTimeSpent(performance.now() - startAt)}.`, true);

    return completion;
  }
}

export default Workflow;
