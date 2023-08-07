import { Directive, HostListener, Input } from '@angular/core';
import {NotificationService} from "./notification.service";

@Directive({
  selector: '[copyClipboard]'
})
export class CopyClipboardDirective {
  @Input("copyClipboard")
  public payload: string = "";

  constructor(private notificationService: NotificationService) {}

  @HostListener("click", ["$event"])
  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.payload) {
      this.notificationService.showToast('error', 'Please generate password');
      return;
    }

    navigator.clipboard.writeText(this.payload.toString()).then(() => {
      this.notificationService.showToast('success', 'Password copied');
    });
  }

}
