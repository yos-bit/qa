import { expect } from "@playwright/test";
export class ShoppingCart {
  constructor(page) {
    this.page = page;
    this.CheckoutButton = this.page.getByRole("button", {
      name: "Checkout",
    });
    this.title = this.page.locator("[data-test='title']");
    this.cartItems = this.page.locator(".cart_item");
  }
}
