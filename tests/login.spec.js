import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";
import { BASE_URL, Urls } from "../data/Urls";
import { VALID_PASSWORD, LOCKED_OUT_USER, VALID_USERS } from "../data/users";
import { Inventory } from "../pages/Inventory";

test.describe("Valid Login Tests", () => {
  VALID_USERS.forEach((userName) => {
    test(`Login with ${userName}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventory = new Inventory(page);
      await loginPage.openLoginPage();
      await loginPage.login(userName, VALID_PASSWORD);
      await expect(page).toHaveURL(Urls.INVENTORY_URL);
      await expect(inventory.title).toHaveText("Products");
    });
  });
});

test.describe("Invalid Login Tests", () => {
  test("Login with locked out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(LOCKED_OUT_USER, VALID_PASSWORD);
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
