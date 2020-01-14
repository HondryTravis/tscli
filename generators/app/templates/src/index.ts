import "./theme/main.scss"
import { getSum } from "./types/index.type";
export class num implements getSum {
  sum (a: number, b: number) {
    return a + b;
  }
}
