import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-check-box",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./check-box.component.html",
  styles: [],
})
export class CheckBoxComponent {
  @Output() onChange = new EventEmitter<Event>();
}
