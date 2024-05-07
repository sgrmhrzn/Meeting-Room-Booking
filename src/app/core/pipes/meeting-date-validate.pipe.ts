import { Pipe, PipeTransform } from '@angular/core';
import { RoomModel } from '../models/room.model';
import dayjs from 'dayjs';

@Pipe({
  name: 'meetingDateValidate',
  standalone: true
})
export class MeetingDateValidatePipe implements PipeTransform {

  transform(rooms: RoomModel[], args: any[]): RoomModel[] {
    // console.log(args);
    const newRooms: RoomModel[] = [];
    rooms?.filter(r => {
      if (r.bookingDetails?.length) {

        r.bookingDetails?.forEach(b => {
          const startTime = dayjs(b.date).set('hours', b.startTime.getHours()).set('minutes', b.startTime.getMinutes());
          const endTime = dayjs(b.date).set('hours', b.endTime.getHours()).set('minutes', b.endTime.getMinutes());
          const selectedStartTime = dayjs(args[1]).set('hours', args[0].getHours()).set('minutes', args[0].getMinutes());
          // if(dayjs(args[1]).format('DD/MM/YYYY') !== dayjs(b.date).format('DD/MM/YYYY')){
          console.log(startTime, endTime, selectedStartTime);
          if (selectedStartTime >= startTime && selectedStartTime <= endTime) {
            console.log('room not available');
            // if (!selectedStartTime.isAfter(startTime) && !selectedStartTime.isBefore(endTime)) {
            return;
          }
          if (!newRooms.find(x => x.id === r.id))
            newRooms.push(r);
          // }
        });
      } else {
        newRooms.push(r);
      }
    })
    return newRooms;
  }

}
