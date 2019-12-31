import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Process} from '../models/process';
import {MessageDetail} from '../models/message-detail';

@Injectable()
export class ProcessService {
  private processesUrl = '/api/processes';

  constructor(private http: HttpClient) {
  }

  getProcesses(): Observable<Process[]> {
    return this.http.get<Process[]>(this.processesUrl);
  }

  getProcess(id: string): Observable<Process> {
    return this.http.get<Process>(`${this.processesUrl}/${id}`);
  }

  getFailedMessage(processId: string, messageId: string): Observable<MessageDetail> {
    return this.http.get<MessageDetail>(`${this.processesUrl}/${processId}/failed-messages/${messageId}`);
  }

  getPendingMessage(processId: string, messageId: string): Observable<MessageDetail> {
    return this.http.get<MessageDetail>(`${this.processesUrl}/${processId}/pending-messages/${messageId}`);
  }

}
