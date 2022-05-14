import * as path from "path";

const dir = path.resolve(__dirname, "..");
const x = {};
const y = Object.assign(x, { b: 3524 });

export { x, y, dir };
