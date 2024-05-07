import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoomModel, rooms } from '../../core/models/room.model';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Store } from '@ngrx/store';
import { selectRooms } from '../../core/state/app.selectors';
import { GlobalState } from '../../core/state/app.reducer';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RoomFilterPipe } from '../../core/pipes/room-filter.pipe';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzGridModule, NzIconModule, CommonModule, ReactiveFormsModule, NzSelectModule, NzButtonModule, RoomFilterPipe, NzEmptyModule, NzFlexModule,
    DateTimeFormatPipe, NzFormModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {
  filterForm: FormGroup<{
    capacity: FormControl<number>;
    amenities: FormControl<string[]>;
  }> = this.fb.group({
    capacity: [0, [Validators.required]],
    amenities: [new Array<string>, [Validators.required]],
  });

  listOfOption: string[] = [];
  // listOfSelectedValue = ['a10', 'c12'];
  rooms$: Observable<RoomModel[] | any> = this.store.select(selectRooms);
  constructor(private store: Store<GlobalState>, private fb: NonNullableFormBuilder,) {
    this.rooms$.subscribe(r => console.log(r));
  }
  ngOnInit(): void {
    const children: string[] = ['wifi', 'sound', 'projector'];
    // for (let i = 10; i < 36; i++) {
    //   children.push(`${i.toString(36)}${i}`);
    // }
    this.listOfOption = children;
  }

  onSubmit() {

  }
}
