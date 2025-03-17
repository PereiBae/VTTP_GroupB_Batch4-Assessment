import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CartStore} from "./cart.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private cartStore = inject(CartStore)

  private router = inject(Router)

  itemCount$!: Observable<number>

  ngOnInit(): void {
    this.itemCount$=this.cartStore.getCartCount
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
