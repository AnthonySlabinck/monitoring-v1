import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {MessageDetail} from '../../models/message-detail';

@Component({
  selector: 'app-message-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  @Input() message: MessageDetail;

  constructor() {
  }

  ngOnInit() {
  }

}
