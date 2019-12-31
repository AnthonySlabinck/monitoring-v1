import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {MessageDetail} from '../../models/message-detail';

@Component({
  selector: 'app-failed-message-page',
  templateUrl: './failed-message-page.component.html',
  styleUrls: ['./failed-message-page.component.css']
})
export class FailedMessagePageComponent implements OnInit {
  processId = this.route.snapshot.params['processId'];
  message$: Observable<MessageDetail>;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.message$ = this.route.data.map(data => data.message$);
  }

  goToProcessDetail(): void {
    this.router.navigate(['processes', this.processId]);
  }

}
