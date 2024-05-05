import { Component } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CommonService } from '../../core/services/common.service';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NzCalendarModule, NzBadgeModule, RouterModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  dateFormat = new DateTimeFormatPipe();
  constructor(public cs: CommonService) {

  }


}
