import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface ToastNotification {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public toast$: Observable<{ type: string; message: string }>;
  private toast: Subject<ToastNotification> = new Subject<ToastNotification>();

  constructor() {
    this.toast$ = this.toast.asObservable();
  }

  public showToast(type: string, message: string): void {
    this.toast.next({ type, message });

  }

}
