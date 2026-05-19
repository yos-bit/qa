import { expect } from "@playwright/test";

export class CheckOutComplete {
  constructor(page) {
    this.page = page;
    this.Header = page.getByRole("heading", {
      name: "Thank you for your order!",
    });
    this.title = this.page.locator("[data-test='title']");
  }
}
