import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';

import {ProcessesSandbox} from '../../processes.sandbox';

@Component({
  selector: 'app-processes-page',
  templateUrl: './processes-page.component.html',
  styleUrls: ['./processes-page.component.css']
})
export class ProcessesPageComponent implements OnInit, OnDestroy {
  filterText$ = new BehaviorSubject('');
  processes$ = this.sb.processes$;
  filteredProcesses$ = Observable.combineLatest(
    this.filterText$,
    this.processes$,
    (filterText, processes) => {
      return processes.filter(process => process.id.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    });

  private refreshSubscription: Subscription;

  constructor(private sb: ProcessesSandbox, private router: Router) {
  }

  ngOnInit() {
    this.refreshSubscription = Observable
      .interval(60000)
      .timeInterval()
      .subscribe(x => this.sb.getProcesses());
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  refresh(): void {
    this.sb.getProcesses();
  }

  goToViewProcessPage(processId: string): void {
    this.router.navigate(['processes', processId]);
  }

}
