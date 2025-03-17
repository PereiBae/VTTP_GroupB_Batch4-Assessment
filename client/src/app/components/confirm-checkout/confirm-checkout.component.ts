import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartStore} from "../../cart.store";
import {LineItem, Order} from "../../models";
import {Observable} from "rxjs";
import {ProductService} from "../../product.service";
import {Router} from "@angular/router";

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
  private router = inject(Router)

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

  placeOrder() {
    if (this.form.valid) {
      // Get the line items from the cart store
      this.cartStore.getLineItems.subscribe(lineItems => {
        if (lineItems.length > 0) {
          // Create the order object
          const order: Order = {
            name: this.form.value.name,
            address: this.form.value.address,
            priority: this.form.value.priority,
            comments: this.form.value.comments,
            cart: {
              lineItems: lineItems
            }
          };

          // Send the order to the backend
          this.productService.checkout(order).subscribe({
            next: (response) => {
              console.log('Order placed successfully:', response);
              alert('Order placed successfully for order ' + response);
              // Clear the cart
              this.cartStore.clearCart(); // You'll need to add this method to CartStore
              // Navigate back to home
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Error placing order:', error);
              alert('Failed to place order. Error: ' + error);
            }
          });
        } else {
          alert('Your cart is empty!');
        }
      });
    }
  }

}
