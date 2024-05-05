import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomModel, rooms } from '../../core/models/room.model';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzGridModule, NzIconModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {
  rooms = rooms;
}
