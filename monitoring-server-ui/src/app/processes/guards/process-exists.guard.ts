import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as fromRoot from '../../state-management/reducers/root.reducer';
import {AppState} from '../../state-management/reducers/root.reducer';

@Injectable()
export class ProcessExistsGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router, private toastr: ToastrService) {
  }

  waitForProcessesToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getLoaded)
      .filter(loaded => loaded)
      .take(1);
  }

  hasProcessInStore(id: string): Observable<boolean> {
    return this.store.select(fromRoot.getProcessEntities)
      .map(entities => !!entities[id])
      .take(1);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('ProcessExistsGuard#canActivate called');
    return this.waitForProcessesToLoad().switchMap(() => {
      return this.hasProcessInStore(next.params['id']).switchMap(hasProcessInStore => {
          if (!hasProcessInStore) {
            this.toastr.error(next.params['id'], 'Process does not exist');
            this.router.navigate(['/processes']);
          }
          return Observable.of(hasProcessInStore);
        }
      )
    });
  }


}
