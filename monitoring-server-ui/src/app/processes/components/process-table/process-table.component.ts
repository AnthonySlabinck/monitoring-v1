import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Process} from '../../models/process';

@Component({
  selector: 'app-process-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {
  @Input() processes: Process[];
  @Output() select = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}
