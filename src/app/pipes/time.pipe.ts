import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "time",
})
export class TimePipe implements PipeTransform {
  transform(value?: number, ...args: unknown[]): unknown {
    if (!value) return "0:00";
    const minutes = Math.floor(value / 60);
    const secondsLeft = Math.floor(value % 60);
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  }
}
