import {Injectable} from "@angular/core";
import {Cart, LineItem} from "./models";
import {ComponentStore} from "@ngrx/component-store";

const INIT:Cart = {
  lineItems:[]
}

@Injectable({
  providedIn: 'root'
})
// TODO Task 2
// Use the following class to implement your store
export class CartStore extends ComponentStore<Cart>{

  constructor() {
    // Initialize the store, initially the store is empty
    super(INIT)
  }

  // mutators - update methods
  // addLineItem(newLineItem)

  readonly addLineItem = this.updater<LineItem>(
    (slice: Cart, newLineItem: LineItem) => {

      console.info('>>> toSave: ', newLineItem)
      return {
        lineItems: [...slice.lineItems, newLineItem]
      } as Cart
    }
  )

  readonly addLineItems = this.updater<LineItem[]>(
    (slice: Cart, newLineItem: LineItem[]) => {

      console.info('>>> toSave: ', newLineItem)
      return {
        lineItems: [...slice.lineItems, ...newLineItem]
      } as Cart
    }
  )

  // Selector - query
  readonly getLineItems = this.select<LineItem[]>(
    (slice: Cart) => slice.lineItems
  )

  readonly getCartCount = this.select<number>(
    (slice: Cart) => slice.lineItems.length
  )

  readonly deleteTask = this.updater<string>(
    (slice: Cart, productId: string) => {
      return {
        lineItems: slice.lineItems.filter(task => task.prodId !== productId),
      }
    }
  )

  readonly clearCart = this.updater<void>(
    (slice: Cart) => {
      return {
        lineItems: []
      } as Cart;
    }
  )

}
