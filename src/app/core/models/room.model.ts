export enum RoomStatusEnum {
    Available,
    Booked
}

export interface RoomModel {
    id: string;
    title: string;
    capacity: number;
    amenities?: {
        ac?: boolean;
        projector?: boolean;
        speaker?: boolean;
        wifi?: boolean;
    };
    status?: RoomStatusEnum;
    bookingDetails?: [{
        date: Date;
        startTime: Date;
        endTime: Date;
    }]
}


export const rooms = new Array<RoomModel>({
    id: '0',
    title: 'Room 1', amenities: {
        ac: true,
        projector: true,
        speaker: true,
        wifi: true
    }, capacity: 100
}, { id: '1', title: 'Room 2', capacity: 100 });