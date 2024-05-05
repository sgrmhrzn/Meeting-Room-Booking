export interface MeetingModel {
    id: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    title: string;
    description: string;
    roomId: string;
    attendees: number;
}