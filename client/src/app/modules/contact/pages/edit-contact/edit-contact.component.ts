import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";

@Component({
  selector: "app-edit-contact",
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: "./edit-contact.component.html",
  styles: [],
})
export class EditContactComponent {}
