import { Component } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalState } from '../../core/state/app.reducer';
import { Store } from '@ngrx/store';
import { selectMeetings, selectRoomById } from '../../core/state/app.selectors';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ScheduleMeetingComponent } from '../schedule-meeting/schedule-meeting.component';
import { MeetingModel } from '../../core/models/meeting.model';
import { deleteMeeting } from '../../core/state/app.action';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RoomModel } from '../../core/models/room.model';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NzCalendarModule, NzBadgeModule, RouterModule, CommonModule, NzModalModule, NzButtonModule, ScheduleMeetingComponent, NzPopconfirmModule,
    NzToolTipModule, DateTimeFormatPipe, NzFlexModule, NzIconModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  dateFormat = new DateTimeFormatPipe();
  meetings$: Observable<any> = this.store.select(selectMeetings);
  isVisible = false;
  selectedMeeting: MeetingModel | undefined;
  isEdit = false;
  room$: Observable<RoomModel | any> = new Observable<RoomModel>();

  constructor(private store: Store<GlobalState>, private message: NzMessageService) {

  }
  showModal(item: MeetingModel): void {
    this.selectedMeeting = item;
    this.isVisible = true;
    this.room$ = this.store.select(selectRoomById(item.roomId));

  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  cancel() {
    this.isVisible = false;

  }

  handleDelete() {
    if (this.selectedMeeting) {
      this.store.dispatch(deleteMeeting({ id: this.selectedMeeting?.id as string }));
      this.message.create('success', `Meeting deleted successfully!`);
      this.isVisible = false;
    }
  }
}
