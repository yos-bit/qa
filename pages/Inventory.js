import { expect } from "@playwright/test";

export class Inventory {
  constructor(page) {
    this.page = page;
    this.addToCartBackPackButton = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.addToCartBoltTShirtButton = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
    );
    this.title = this.page.locator("[data-test='title']");
    this.shoppingCartBadge = this.page.locator(
      "[data-test='shopping-cart-badge']",
    );
    this.shoppingCartLink = this.page.locator(
      "[data-test='shopping-cart-link']",
    );
  }
}
