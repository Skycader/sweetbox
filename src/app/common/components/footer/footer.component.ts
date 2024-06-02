import { Component } from '@angular/core';
import { AppConfig, AppConfigInterface } from '../../../../config/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public appConfig: AppConfigInterface = AppConfig;
}
