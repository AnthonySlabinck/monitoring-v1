import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {ProcessesSandbox} from '../../processes.sandbox';

@Component({
  selector: 'app-view-process-page',
  templateUrl: './view-process-page.component.html',
  styleUrls: ['./view-process-page.component.css']
})
export class ViewProcessPageComponent implements OnInit, OnDestroy {
  private actionsSubscription: Subscription;

  constructor(private sb: ProcessesSandbox, private route: ActivatedRoute) {
    this.actionsSubscription = this.route.params
      .subscribe(params => this.sb.selectProcess(params.id));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

}
