import _ from "lodash";
import { MeetingModel } from "../models/meeting.model";
import { RoomModel, rooms } from "../models/room.model";
import { addMeeting, deleteMeeting, updateRoomStatus, updateMeeting } from "./app.action";

export interface GlobalState {
  global: AppState
}
export interface AppState {
  meetings: MeetingModel[];
  rooms: RoomModel[];
}

export const initialState: AppState = {
  meetings: [],
  rooms: rooms
};

export function appReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case addMeeting.type:
      return {
        ...state, meetings

          : [...state.meetings, action.meeting]
      };
    case updateMeeting.type:
      return {
        ...state,
        meetings: state.meetings.map(meeting => (meeting.id === action.meeting.id ? action.meeting : meeting))
      };
    case deleteMeeting.type:
      const newRooms = state.rooms.map(room => {
        const roomNew = _.cloneDeep(room);

        const existingMeeting = roomNew.bookingDetails?.find(x => x.meetingId === action.id);
        if (existingMeeting) {
          roomNew.bookingDetails?.splice(roomNew.bookingDetails.indexOf(existingMeeting), 1);
        }
        return roomNew;
      })

      return { ...state, meetings: state.meetings.filter(meeting => meeting.id !== action.id), rooms: newRooms };
    case updateRoomStatus.type:
      const updatedRooms = state.rooms.map(room => {
        const roomNew = _.cloneDeep(room);
        if (room.id === action.booking.roomId) {
          let existingMeeting = room.bookingDetails?.find(b => b.meetingId === action.booking.meetingId);
          existingMeeting ? null : roomNew.bookingDetails?.push({ ...action.booking });
        } else {
          const existingMeeting = roomNew.bookingDetails?.find(x => x.meetingId === action.booking.meetingId);
          if (existingMeeting) {
            roomNew.bookingDetails?.splice(roomNew.bookingDetails.indexOf(existingMeeting), 1);
          }
        }
        return roomNew;
      })
      return { ...state, rooms: updatedRooms }

    default:
      return state;
  }
}