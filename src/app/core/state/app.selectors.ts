import { createSelector } from '@ngrx/store';
import { AppState, GlobalState } from './app.reducer';
import { MeetingModel } from '../models/meeting.model';
import _ from 'lodash';
import { RoomModel } from '../models/room.model';

export const selectMeetings = (state: GlobalState) => state.global.meetings;

export const selectMeetingById = (id: string) =>
    createSelector(selectMeetings, meetings => meetings.find(meeting => meeting.id === id) as MeetingModel);

export const selectRecentTen = () =>
    createSelector(selectMeetings, meetings => { const ordered = _.orderBy(meetings, ['date'], ['asc']); return _.take(ordered, 10) as MeetingModel[] });

export const selectRooms = (state: GlobalState) => state.global.rooms;

export const selectRoomById = (id: string) =>
    createSelector(selectRooms, rooms => rooms.find(room => room.id === id) as RoomModel);