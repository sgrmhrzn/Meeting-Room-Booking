import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NzMenuModule, NzLayoutModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed = false;

}
