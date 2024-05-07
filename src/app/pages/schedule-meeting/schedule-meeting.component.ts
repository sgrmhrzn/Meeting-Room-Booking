import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RoomModel } from '../../core/models/room.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../core/state/app.reducer';
import { Store } from '@ngrx/store';
import { addMeeting, updateRoomStatus, updateMeeting } from '../../core/state/app.action';
import { Observable } from 'rxjs';
import { selectMeetingById, selectMeetings, selectRoomById, selectRooms } from '../../core/state/app.selectors';
import { MeetingModel } from '../../core/models/meeting.model';
import dayjs from 'dayjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { MeetingDateValidatePipe } from '../../core/pipes/meeting-date-validate.pipe';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [CommonModule, NzCalendarModule, NzAlertModule, FormsModule,
    NzFlexModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzButtonModule, NzDatePickerModule, NzTimePickerModule, NzCardModule,
    NzRadioModule, NzIconModule, NzStepsModule, NzDescriptionsModule, DateTimeFormatPipe, NzButtonModule, ScheduleMeetingComponent, NzModalModule,
    NzResultModule, NzPopconfirmModule, MeetingDateValidatePipe, NzEmptyModule
  ],
  templateUrl: './schedule-meeting.component.html',
  styleUrl: './schedule-meeting.component.scss'
})
export class ScheduleMeetingComponent implements OnInit, OnDestroy {
  // selectedDate = new Date();
  // startTime = new Date();
  // endTime = new Date();
  initialDate = new Date();

  @Input() isEdit? = false;
  @Input() meetingId? = '';
  @Input() showButton? = true;
  meetingDetailForm: FormGroup<{
    id: FormControl<string>;
    title: FormControl<string>;
    attendees: FormControl<number>;
    description: FormControl<string>;
  }> = this.fb.group({
    id: ['', []],
    title: ['', [Validators.required, Validators.maxLength(25)]],
    attendees: [0, [Validators.required, Validators.min(1), Validators.max(1000)]],
    description: ['', [Validators.required]]
  });
  radioValue = '';
  timeForm: FormGroup<{
    date: FormControl<Date>;
    startTime: FormControl<Date>;
    endTime: FormControl<Date>;
  }> = this.fb.group({
    date: [new Date(), [Validators.required]],
    startTime: [this.initialDate, [Validators.required]],
    endTime: [new Date(new Date(this.initialDate).setMinutes(this.initialDate.getMinutes() + 15)), [Validators.required]],
  });

  roomForm: FormGroup<{
    id: FormControl<string>;
  }> = this.fb.group({
    id: ['', [Validators.required]],
  });

  // rooms: RoomModel[];

  current = 0;
  // meetingId: any;
  sub: any;

  meeting$: Observable<MeetingModel> = new Observable<MeetingModel>();
  meetings$: Observable<MeetingModel[]> = this.store.select(selectMeetings);
  rooms$: Observable<RoomModel[] | any> = this.store.select(selectRooms);
  room$: Observable<RoomModel | any> = new Observable<RoomModel>();
  isVisible = false;
  meetings?: MeetingModel[];



  constructor(private fb: NonNullableFormBuilder, private route: ActivatedRoute, private store: Store<GlobalState>, private modalService: NzModalService) {
  }
  ngOnDestroy(): void {
    this.current = 0;
  }
  ngOnInit(): void {
    if (this.meetingId) {

      this.meeting$ = this.store.select(selectMeetingById(this.meetingId));
      this.meeting$.subscribe((m: MeetingModel) => {
        if (m) {
          console.log(m);

          const { date, startTime, endTime, id, title, description, attendees, roomId } = m;
          // this.selectedDate = date;
          this.timeForm.setValue({ date, startTime, endTime });
          this.meetingDetailForm.setValue({ id, title, description, attendees });
          this.roomForm.setValue({ id: roomId });
          this.room$ = this.store.select(selectRoomById(roomId));
        }
      })
    }

    this.meetings$.subscribe(meetings => {
      this.meetings = meetings
    }
    )
    this.timeForm.controls.startTime.valueChanges.subscribe(res => {
      this.validateTimeRange();
    });


    this.timeForm.controls.endTime.valueChanges.subscribe(res => {
      this.validateTimeRange();
    });

    this.roomForm.controls.id.valueChanges.subscribe(id => {
      this.room$ = this.store.select(selectRoomById(id));
    })
  }

  selectChange(select: Date): void {
    this.timeForm.controls.date.setValue(select);
  }
  validateTimeRange() {
    const { startTime, endTime } = this.timeForm.getRawValue();
    console.log(dayjs(endTime).diff(startTime));
    if (dayjs(endTime).isBefore(startTime) || dayjs(endTime).diff(startTime) < 900000) {
      this.timeForm.controls.endTime.setErrors({ invalidTime: true });
      this.timeForm.controls.endTime.markAsDirty({ onlySelf: true });
    }
  }
  pre(): void {
    this.current -= 1;
  }

  next(event: number): void {
    if (this.current <= event) {

      if (this.timeForm.invalid && this.current === 0) {
        this.makeDirty(this.timeForm);
        return;
      } else if (this.roomForm.invalid && this.current === 1) {
        this.makeDirty(this.roomForm);
        return;
      } else if (this.meetingDetailForm.invalid && this.current === 2) {
        this.makeDirty(this.meetingDetailForm);
        return;
      }


    }
    this.current = event;
  }
  done(): void {
    const { date, startTime, endTime } = this.timeForm.getRawValue();
    const { description, title, attendees } = this.meetingDetailForm.getRawValue();
    const meeting = { id: this.uuidv4(), date, startTime, endTime, description, title, attendees, roomId: this.roomForm.getRawValue().id };

    if (this.meetingId) {
      meeting.id = this.meetingId;
      this.store.dispatch(updateMeeting({ meeting }));
    } else {
      this.store.dispatch(addMeeting({ meeting }));
    }
    const booking = { meetingId: meeting.id, roomId: meeting.roomId, ...this.timeForm.getRawValue() };
    this.store.dispatch(updateRoomStatus({ booking }));
    this.current = 4;
  }
  // onIndexChange(event: number): void {
  //   this.current = event;
  // }
  makeDirty(form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  getStatus(index: number) {
    if (this.current === index) {
      return 'process';
    } else if (this.current > index - 1) {
      return 'finish';
    }
    else {
      return 'wait';
    }
  }

  disableDates(event: Date) {
    return dayjs(event).diff(dayjs().subtract(1, 'day')) <= 0;
  }

  disabledEndHours(): () => number[] {
    const currentHour = dayjs(this.timeForm.value.startTime).get('hours');
    return () => [...this.disableHours(currentHour),];
  }
  disabledEndMinutes(): (hour: any) => number[] {
    const h = dayjs(this.timeForm.value.startTime).get('hours');
    const currenMinute = dayjs(this.timeForm.value.startTime).get('minutes');

    return (hour: any) => this.disableMinutes(h, currenMinute);
  }

  disabledStartHours(): () => number[] {
    const currentHour = dayjs().get('hours');
    return () => this.disableHours(currentHour);
  }

  disabledStartMinutes(): (hour: any) => number[] {
    const h = dayjs(this.timeForm.value.startTime).get('hours');
    const currenMinute = dayjs().get('minutes');
    return (hour: any) => this.disableMinutes(h, currenMinute);
  }

  disableHours(startHour: number) {
    const hoursToDisable = [];
    for (var i = 0; i++, i < startHour;) {
      hoursToDisable.push(i);
    }
    return hoursToDisable;
  }

  disableMinutes(startHour: number, currentMinute: number) {
    const currentHour = dayjs().get('hours');
    const minutesToDisable = [];
    if (currentHour === startHour) {

      for (var i = 0; i++, i <= currentMinute;) {
        minutesToDisable.push(i);
      }
    }
    return minutesToDisable;
  }

  onChange(t: any) {
    console.log(t);
  }
  uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  showModal(): void {
    this.isVisible = true;
    this.current = 0;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.reset();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.reset();

  }

  reset() {
    this.roomForm.reset();
    this.timeForm.reset();
    this.meetingDetailForm.reset();
    this.modalService.closeAll();

  }
  cancel() {
    // this.reset();
  }

}
