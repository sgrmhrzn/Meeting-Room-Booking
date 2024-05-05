import { MeetingModel } from "../models/meeting.model";
import { RoomModel } from "../models/room.model";
import { addMeeting, deleteMeeting, updateMeeting } from "./app.action";

export interface GlobalState {
  global: AppState
}
export interface AppState {
    meetings: MeetingModel[];
    rooms: RoomModel[];
}

export const initialState: AppState = {
    meetings: [],
    rooms: []
};

export function appReducer(state = initialState, action: any): AppState {
    switch (action.type) {
      case addMeeting.type:
        return { ...state, meetings
  
  : [...state.meetings, action.meeting] };
      case updateMeeting.type:
        return {
          ...state,
          meetings: state.meetings.map(meeting => (meeting.id === action.meeting.id ? action.meeting : meeting))
        };
      case deleteMeeting.type:
        return { ...state, meetings: state.meetings.filter(meeting => meeting.id !== action.id) };
      default:
        return state;
    }
  }