import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {MessageDetail} from '../../models/message-detail';

@Component({
  selector: 'app-pending-message-page',
  templateUrl: './pending-message-page.component.html',
  styleUrls: ['./pending-message-page.component.css']
})
export class PendingMessagePageComponent implements OnInit {
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
