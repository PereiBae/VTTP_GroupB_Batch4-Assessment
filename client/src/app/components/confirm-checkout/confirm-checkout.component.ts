import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartStore} from "../../cart.store";
import {LineItem, Order} from "../../models";
import {Observable, Subscription} from "rxjs";
import {ProductService} from "../../product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit, OnDestroy {

  // TODO Task 3
  protected form!: FormGroup;
  private fb = inject(FormBuilder)

  private cartStore = inject(CartStore)
  private productService = inject(ProductService)
  private router = inject(Router)

  lineItems$!: Observable<LineItem[]>

  private subscriptions: Subscription = new Subscription();

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
      // Add the subscription to our subscriptions property
      const itemsSub = this.cartStore.getLineItems.subscribe(lineItems => {
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

          // Add the checkout subscription to our subscriptions property
          const checkoutSub = this.productService.checkout(order).subscribe({
            next: (response) => {
              console.log('Order placed successfully:', response);
              alert('Order placed successfully!');
              // Clear the cart
              this.cartStore.clearCart();
              // Navigate back to home
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Error placing order:', error);
              alert('Failed to place order. Please try again.');
            }
          });

          // Add the checkout subscription to our subscriptions
          this.subscriptions.add(checkoutSub);
        } else {
          alert('Your cart is empty!');
        }
      });

      // Add the items subscription to our subscriptions
      this.subscriptions.add(itemsSub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
