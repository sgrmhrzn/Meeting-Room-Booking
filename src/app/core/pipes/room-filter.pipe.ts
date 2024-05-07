import { Pipe, PipeTransform } from '@angular/core';
import { RoomModel } from '../models/room.model';

@Pipe({
  name: 'roomFilter',
  standalone: true
})
export class RoomFilterPipe implements PipeTransform {

  transform(rooms: RoomModel[], args: any): RoomModel[] {
    let newRooms: RoomModel[] = [...rooms];
    console.log(rooms);
    if (args?.capacity) {

      switch (+args.capacity) {
        case 0:
          newRooms = rooms.filter(x => x.capacity <= 10);
          break;
        case 1:
          newRooms = rooms.filter(x => x.capacity > 10 && x.capacity <= 50);
          break;
        case 2:
          newRooms = rooms.filter(x => x.capacity > 50 && x.capacity <= 100);
          break;
      }
    }

    console.log(args.amenities.join(), newRooms);
    if (args?.amenities.length) {
      // args.amenities.forEach((element: string) => {
      newRooms = newRooms.filter(x => x.amenities?.join().includes(args.amenities.join()));
      // });
    }

    return newRooms;
  }

}
