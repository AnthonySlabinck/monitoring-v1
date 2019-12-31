import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';

import {ProcessesSandbox} from '../../processes.sandbox';

@Component({
  selector: 'app-selected-process-page',
  templateUrl: './selected-process-page.component.html',
  styleUrls: ['./selected-process-page.component.css']
})
export class SelectedProcessPageComponent implements OnInit, OnDestroy {
  id: string;
  process$ = this.sb.selectedProcess$;

  private refreshSubscription: Subscription;

  constructor(private sb: ProcessesSandbox, private route: ActivatedRoute, private router: Router) {
    this.route.params
      .subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.refreshSubscription = Observable
      .interval(30000)
      .timeInterval()
      .subscribe(x => this.sb.getProcess(this.id));
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  refresh(): void {
    this.sb.getProcess(this.id);
  }

  goToFailedMessagePage(messageId: string): void {
    this.router.navigate([`processes/${this.id}/failed-messages`, messageId]);
  }

  goToPendingMessagePage(messageId: string): void {
    this.router.navigate([`processes/${this.id}/pending-messages`, messageId]);
  }

}
