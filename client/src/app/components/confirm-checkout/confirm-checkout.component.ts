import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartStore} from "../../cart.store";
import {Cart, LineItem} from "../../models";
import {Observable} from "rxjs";
import {ProductService} from "../../product.service";

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3
  protected form!: FormGroup;
  private fb = inject(FormBuilder)

  private cartStore = inject(CartStore)
  private productService = inject(ProductService)

  lineItems$!: Observable<LineItem[]>

  ngOnInit() {
    this.createForm();
    this.lineItems$ = this.cartStore.getLineItems
  }

  createForm() {
    this.form = this.fb.group({
      'name': this.fb.control<string>('', [Validators.required]),
      'address': this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      'priority': this.fb.control<boolean>(false),
      'comments': this.fb.control<string>(''),
    })
  }

  // Calculate total price
  calculateTotal(items: LineItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  checkout() {
    this.productService.checkout(this.form.value)
  }

}
