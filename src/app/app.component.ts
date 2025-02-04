import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MenuComponent } from "./components/menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PoPageModule,
    MenuComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
