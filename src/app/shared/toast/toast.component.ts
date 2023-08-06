import {Component, OnInit} from '@angular/core';
import {NotificationService, ToastNotification} from "../notification.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.3s ease-in', style({opacity: 1})),
      ]),
      transition(':leave', [animate('0.3s ease-out', style({opacity: 0}))]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  display: boolean = false;
  type: string = '';
  message: string = '';
  notifications: ToastNotification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.toast$.subscribe((notification) => {
      this.notifications.push(notification);
      this.display = true;

      setTimeout(() => {
        this.notifications.shift();
        this.display = this.notifications.length > 0;
      }, 3000);
    });
  }
}
