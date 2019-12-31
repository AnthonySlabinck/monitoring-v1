import {Component, OnInit} from '@angular/core';

import {AppSandbox} from './app.sandbox';
import {ProcessesSandbox} from './processes/processes.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSpinner$ = this.appSandbox.showSpinner$;

  constructor(private appSandbox: AppSandbox, private processesSandbox: ProcessesSandbox) {
  }

  ngOnInit() {
    this.processesSandbox.getProcesses();
  }

}
