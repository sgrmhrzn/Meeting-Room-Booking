import { Injectable } from '@angular/core';
import { MeetingModel } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  meetings = new Array<MeetingModel>();
  constructor() { }
}
