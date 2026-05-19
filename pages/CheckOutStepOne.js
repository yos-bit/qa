import { expect } from "@playwright/test";
export class CheckOutStepOne {
  constructor(page) {
    this.page = page;
    this.firstNameField = this.page.getByRole("textbox", {
      name: "First Name",
    });
    this.lastNameField = this.page.getByRole("textbox", { name: "Last Name" });
    this.postalCodeField = this.page.getByRole("textbox", {
      name: "Postal Code",
    });
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.title = this.page.locator("[data-test='title']");
  }
  async fillCheckOutStepOneForm(userDetails) {
    const [firstName, lastName, postalCode] = userDetails;
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueButton.click();
  }
}
