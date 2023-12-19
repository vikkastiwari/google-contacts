import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { CheckBoxComponent } from "@/app/core/components/check-box/check-box.component";
import { IContact } from "@/app/modules/contact/types/contact";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [CommonModule, RouterLink, CheckBoxComponent],
  templateUrl: "./contact-list.component.html",
  styles: [],
})
export class ContactListComponent {
  @Input() contacts: IContact[] = [];

  @Input() selectedContactIds: Set<number> = new Set();

  @Input() isTrash = false;

  @Input() isFavourite = false;

  @Output() onChange = new EventEmitter<{
    checked: boolean;
    contactId: number;
  }>();

  @Output() onDelete = new EventEmitter<number>();

  @Output() onRecover = new EventEmitter<number>();

  @Output() onFavourite = new EventEmitter<{
    contactId: number;
    isFavourite: boolean;
  }>();

  handleCheckBox(event: Event, contactId: number) {
    let { checked } = event.target as HTMLInputElement;
    this.onChange.emit({ checked, contactId });
  }

  handleTrackContact(index: number, contact: IContact) {
    return contact.id;
  }

  handleDelete(event: MouseEvent, contactId: number) {
    event.stopPropagation();
    this.onDelete.emit(contactId);
  }

  handleFavourite(event: MouseEvent, contactId: number, isFavourite: boolean) {
    event.stopPropagation();
    this.onFavourite.emit({ contactId, isFavourite });
  }

  handleRecover(event: MouseEvent, contactId: number) {
    event.stopPropagation();
    this.onRecover.emit(contactId);
  }

  formatTime(date: string) {
    return dayjs.tz(new Date(date), "Asia/Kolkata").format("MMM D");
  }
}
