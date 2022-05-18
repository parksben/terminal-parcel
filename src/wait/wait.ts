export default function wait(timing: number) {
  return new Promise((res) => setTimeout(res, timing));
}
