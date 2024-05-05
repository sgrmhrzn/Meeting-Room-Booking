import { Routes } from '@angular/router';
import { ScheduleMeetingComponent } from './schedule-meeting.component';
import { CalendarComponent } from '../calendar/calendar.component';

export const MEETING_ROUTES: Routes = [
  { path: 'schedule', component: ScheduleMeetingComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: ':id', component: ScheduleMeetingComponent }
];
