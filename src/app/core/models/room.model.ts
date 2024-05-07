export enum RoomStatusEnum {
    Available,
    Booked
}

export interface RoomModel {
    id: string;
    title: string;
    capacity: number;
    amenities?: string[];
    status?: RoomStatusEnum;
    bookingDetails?: BookingModel[]
}


export const rooms = new Array<RoomModel>({
    id: '0',
    title: 'Room 1', amenities: [
        'wifi'
    ], capacity: 100,
    bookingDetails: new Array<BookingModel>()
}, {
    id: '1', title: 'Room 2', capacity: 50,
    amenities: [
        'projector',
        'sound',
        'wifi'
    ],
    bookingDetails: new Array<BookingModel>()
},
    {
        id: '2',
        title: 'Room 3', amenities: [
            'wifi'
        ], capacity: 10,
        bookingDetails: new Array<BookingModel>()
    },
    {
        id: '3',
        title: 'Room 4', amenities: [
            'wifi'
        ], capacity: 40,
        bookingDetails: new Array<BookingModel>()
    },
    {
        id: '4',
        title: 'Room 5', amenities: [
            'sound',
            'wifi'
        ], capacity: 80,
        bookingDetails: new Array<BookingModel>()
    },
    {
        id: '5',
        title: 'Room 6', amenities: [
            'projector',
            'sound',
            'wifi',
        ], capacity: 4,
        bookingDetails: new Array<BookingModel>()
    },
    {
        id: '6',
        title: 'Room 7', amenities: [
            'projector',
            'sound',
            'wifi',
        ], capacity: 4,
        bookingDetails: new Array<BookingModel>()
    }

);

export interface BookingModel {
    // roomId: string;
    meetingId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
}