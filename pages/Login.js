import { expect } from "@playwright/test";
import { BASE_URL } from "../data/Urls";
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = this.page.getByRole("textbox", { name: "Username" });
    this.passwordField = this.page.getByRole("textbox", { name: "Password" });
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.errorMessage = this.page.getByRole("heading", {
      name: "Epic sadface: Sorry, this user has been locked out.",
    });
  }
  async openLoginPage() {
    await this.page.goto(BASE_URL);
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
