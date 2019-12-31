import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Message} from '../../models/message';

@Component({
  selector: 'app-message-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css']
})
export class MessageTableComponent implements OnInit {
  @Input() messages: Message[];
  @Output() select = new EventEmitter<string>();
  page = 1;
  pageSize = 10;

  constructor() {
  }

  ngOnInit() {
  }

}
