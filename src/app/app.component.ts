import { Component } from '@angular/core';
import { InitService } from './root/services/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrx-template-app';

  constructor(private init: InitService) { }
}
