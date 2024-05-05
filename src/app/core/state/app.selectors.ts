import { createSelector } from '@ngrx/store';
import { AppState, GlobalState } from './app.reducer';

export const selectMeetings = (state: GlobalState) => state.global.meetings;

// export const selectMeetingById = (id: string) =>
//   createSelector(selectMeetings, meetings => meetings.find(meeting => meeting.id === id));

