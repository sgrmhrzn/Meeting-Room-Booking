import { Component, OnInit } from '@angular/core';
import { RoomListComponent } from '../room-list/room-list.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzListModule } from 'ng-zorro-antd/list';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../core/state/app.reducer';
import { Observable } from 'rxjs';
import { selectRecentTen } from '../../core/state/app.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RoomListComponent, NzFlexModule, NzListModule, DateTimeFormatPipe, CommonModule, RouterModule, NzEmptyModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  meetings$: Observable<any> = this.store.select(selectRecentTen());
  constructor(private store: Store<GlobalState>) {

  }

  ngOnInit() { }

}
