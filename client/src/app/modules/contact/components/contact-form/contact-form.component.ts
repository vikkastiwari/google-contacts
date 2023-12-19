import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { InputComponent } from "@/app/core/components/input/input.component";
import { IContactDetail } from "../../types/contact";
import { isEmpty } from "@/app/core/utils";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: "./contact-form.component.html",
  styles: [],
})
export class ContactFormComponent implements OnChanges {
  @Input() isReadOnly = false;
  @Input() contactDetail = {} as IContactDetail;

  @Output() onSubmit = new EventEmitter<IContactDetail>();
  @Output() onClose = new EventEmitter();

  isExpanded = false;
  isSubmitted = false;

  router = inject(FormBuilder);
  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: this.fb.control("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),
    lastName: this.fb.control("", [
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),
    nickName: this.fb.control("", [
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z]*$/),
    ]),
    company: this.fb.control(""),
    jobTitle: this.fb.control(""),
    department: this.fb.control(""),
    email: this.fb.control("", [Validators.required, Validators.email]),
    phone: this.fb.control("", [
      Validators.required,
      Validators.pattern(
        /^(\+?[0-9]{1,4}[\s\-]?)?(\(?[0-9]{3}\)?|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/
      ),
    ]),
    country: this.fb.control(""),
    addressLine1: this.fb.control(""),
    addressLine2: this.fb.control(""),
    state: this.fb.control(""),
    city: this.fb.control(""),
    pincode: this.fb.control("", [Validators.pattern(/^\d{6}$/)]),
    birthday: this.fb.control("", [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]),
    event: this.fb.control(""),
    website: this.fb.control("", [
      Validators.pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      ),
    ]),
    relatedPeople: this.fb.control(""),
    chat: this.fb.control(""),
    notes: this.fb.control(""),
  });

  get firstName() {
    return this.form.controls["firstName"] as FormControl;
  }

  get lastName() {
    return this.form.controls["lastName"] as FormControl;
  }

  get nickName() {
    return this.form.controls["nickName"] as FormControl;
  }

  get company() {
    return this.form.controls["company"] as FormControl;
  }

  get jobTitle() {
    return this.form.controls["jobTitle"] as FormControl;
  }

  get department() {
    return this.form.controls["department"] as FormControl;
  }

  get email() {
    return this.form.controls["email"] as FormControl;
  }

  get phone() {
    return this.form.controls["phone"] as FormControl;
  }

  get addressLine1() {
    return this.form.controls["addressLine1"] as FormControl;
  }

  get addressLine2() {
    return this.form.controls["addressLine2"] as FormControl;
  }

  get state() {
    return this.form.controls["state"] as FormControl;
  }

  get city() {
    return this.form.controls["city"] as FormControl;
  }

  get pincode() {
    return this.form.controls["pincode"] as FormControl;
  }

  get birthday() {
    return this.form.controls["birthday"] as FormControl;
  }

  get event() {
    return this.form.controls["event"] as FormControl;
  }

  get website() {
    return this.form.controls["website"] as FormControl;
  }

  get relatedPeople() {
    return this.form.controls["relatedPeople"] as FormControl;
  }

  get chat() {
    return this.form.controls["chat"] as FormControl;
  }

  get notes() {
    return this.form.controls["notes"] as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["contactDetail"]) {
      this.contactDetail = changes["contactDetail"]
        .currentValue as IContactDetail;

      if (!isEmpty(this.contactDetail)) {
        this.form.setValue({
          firstName: this.contactDetail.firstName,
          lastName: this.contactDetail.lastName,
          nickName: this.contactDetail.nickName,
          company: this.contactDetail.company,
          jobTitle: this.contactDetail.jobTitle,
          department: this.contactDetail.department,
          email: this.contactDetail.email,
          phone: this.contactDetail.phone,
          country: this.contactDetail.country,
          addressLine1: this.contactDetail.addressLine1,
          addressLine2: this.contactDetail.addressLine2,
          state: this.contactDetail.state,
          city: this.contactDetail.city,
          pincode: this.contactDetail.pincode,
          birthday: this.contactDetail.birthday,
          event: this.contactDetail.event,
          website: this.contactDetail.website,
          relatedPeople: this.contactDetail.relatedPeople,
          chat: this.contactDetail.chat,
          notes: this.contactDetail.notes,
        });
      }
    }
  }

  handleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  handleSaveFrom() {
    if (!this.isSubmitted) this.isSubmitted = true;

    if (!this.form.valid) return;

    this.onSubmit.emit(this.form.value as IContactDetail);
  }
}
