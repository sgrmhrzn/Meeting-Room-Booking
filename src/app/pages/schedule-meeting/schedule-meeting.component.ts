import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RoomModel, rooms } from '../../core/models/room.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { AppState } from '../../core/state/app.reducer';
import { Store } from '@ngrx/store';
import { addMeeting } from '../../core/state/app.action';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [CommonModule, NzCalendarModule, NzAlertModule, FormsModule,
    NzFlexModule, NzFormModule, ReactiveFormsModule, NzInputModule, NzButtonModule, NzTimePickerModule, NzCardModule,
    NzRadioModule, NzIconModule, NzStepsModule, NzDescriptionsModule, DateTimeFormatPipe
  ],
  templateUrl: './schedule-meeting.component.html',
  styleUrl: './schedule-meeting.component.scss'
})
export class ScheduleMeetingComponent {
  selectedDate = new Date();
  startTime = new Date();
  endTime = new Date();
  validateForm: FormGroup<{
    title: FormControl<string>;
    attendees: FormControl<number>;
    description: FormControl<string>;
  }> = this.fb.group({
    title: ['', [Validators.required]],
    attendees: [0, [Validators.required]],
    description: ['', [Validators.required]]
  });
  radioValue = '';
  timeForm: FormGroup<{
    date: FormControl<Date>;
    startTime: FormControl<Date>;
    endTime: FormControl<Date>;
  }> = this.fb.group({
    date: [this.startTime, [Validators.required]],
    startTime: [this.startTime, [Validators.required]],
    endTime: [this.startTime, [Validators.required]],
  });

  roomForm: FormGroup<{
    id: FormControl<string>;
  }> = this.fb.group({
    id: ['', [Validators.required]],
  });

  rooms: RoomModel[];

  current = 0;



  constructor(private fb: NonNullableFormBuilder, private cs: CommonService, private router: Router, private store: Store<AppState>) {
    this.rooms = rooms;
    // this.router.events.subscribe(r =>{
    this.router.routerState.snapshot.root.params['id'];
    // })
  }

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
    this.timeForm.controls.date.setValue(select);
  }

  pre(): void {
    this.current -= 1;
    // this.changeContent();
  }

  next(): void {
    if (this.timeForm.valid) {
      this.current += 1;
    }
    // this.changeContent();
  }
  done(): void {
    console.log('done');
    const { date, startTime, endTime } = this.timeForm.getRawValue();
    const { description, title, attendees } = this.validateForm.getRawValue();
    const meeting = { id: (this.cs.meetings.length + 1).toString(), date, startTime, endTime, description, title, attendees, roomId: this.roomForm.getRawValue().id };
    this.store.dispatch(addMeeting({meeting}));
  }
  onIndexChange(event: number): void {
    this.current = event;
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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

  get selectedRoom(): RoomModel {
    return this.rooms.find(x => x.id === this.roomForm.value.id) || {} as RoomModel;
  }
}
