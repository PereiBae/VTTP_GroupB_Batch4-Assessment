import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3
  protected form!: FormGroup;
  private fb = inject(FormBuilder)

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      'name': this.fb.control<string>('', [Validators.required]),
      'address': this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      'priority': this.fb.control<boolean>(false, [Validators.required]),
      'comments': this.fb.control<string>(''),
    })
  }

}
