import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dateTimeFormat',
  standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: Date | undefined, type: string = ''): string {
    // console.log(dayjs(value).format(type));
    if (type === 'time') {
      return dayjs(value).format('h:mm A')
    } else if (type) {
      return dayjs(value).format(type);
    }
    else {
      return dayjs(value).format('MMM D, YYYY')
    }
  }

}
