import { Component, OnInit } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonService } from '../../core/services/common.service';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { Store } from '@ngrx/store';
import { AppState, GlobalState } from '../../core/state/app.reducer';
import { Observable } from 'rxjs';
import { MeetingModel } from '../../core/models/meeting.model';
import { selectMeetings } from '../../core/state/app.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RoomListComponent, NzFlexModule, NzListModule, DateTimeFormatPipe, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  meetings$: Observable<any> = this.store.select(selectMeetings);
  constructor(public cs: CommonService, private store: Store<GlobalState>) {
    this.meetings$.subscribe(m => console.log(m));
  }

  ngOnInit() { }

}
