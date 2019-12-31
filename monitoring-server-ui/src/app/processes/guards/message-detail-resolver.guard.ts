import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {RouterStateSnapshot} from '@angular/router/src';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import {ProcessService} from '../services/process.service';
import {MessageDetail} from '../models/message-detail';

@Injectable()
export class MessageDetailResolverGuard implements Resolve<MessageDetail> {

  constructor(private processService: ProcessService, private router: Router, private toastr: ToastrService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MessageDetail> {
    const isPendingMessage = route.url
      .map(urlSegment => urlSegment.path)
      .indexOf('pending-messages') > -1;
    const processId = route.paramMap.get('processId');
    const messageId = route.paramMap.get('messageId');
    return this.getMessage(isPendingMessage, processId, messageId).catch(() => {
        this.toastr.error('An error occured');
        this.router.navigate(['/processes']);
        return Observable.of(null);
      }
    );
  }

  private getMessage(isPendingMessage: boolean, processId: string, messageId: string): Observable<MessageDetail> {
    if (isPendingMessage) {
      return this.processService.getPendingMessage(processId, messageId);
    } else {
      return this.processService.getFailedMessage(processId, messageId);
    }
  }

}
