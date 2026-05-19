import { expect } from "@playwright/test";
export class CheckOutStepTwo {
  constructor(page) {
    this.page = page;
    this.finishButton = this.page.getByRole("button", { name: "Finish" });
    this.title = this.page.locator("[data-test='title']");
  }
  async finishCheckOut() {
    await this.finishButton.click();
  }
}
