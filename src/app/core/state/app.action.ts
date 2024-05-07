import { createAction, props } from '@ngrx/store';
import { MeetingModel } from '../models/meeting.model';
import { BookingModel } from '../models/room.model';

export const addMeeting = createAction('[Meeting] Add meeting', props<{ meeting: MeetingModel }>());
export const updateMeeting = createAction('[Meeting] Update meeting', props<{ meeting: MeetingModel }>());
export const deleteMeeting = createAction('[Meeting] Delete meeting', props<{ id: string }>());
export const updateRoomStatus = createAction('[Room] Update room', props<{ booking: BookingModel }>());