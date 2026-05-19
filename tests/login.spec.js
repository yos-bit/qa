import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import { BASE_URL, Urls } from "../data/Urls";
import { VALID_PASSWORD, VALID_USERS, INVALID_USERS } from "../data/users";
import { Inventory } from "../pages/Inventory";
import { ERROR_MESSAGES } from "../data/errorMessages";
const validUser = VALID_USERS.find((user) => user === "standard_user");

test.describe("Valid Login Tests", () => {
  VALID_USERS.forEach((userName) => {
    test(`Login with ${userName}`, async ({ page }) => {
      const loginPage = new Login(page);
      const inventory = new Inventory(page);
      await loginPage.openLoginPage();
      await loginPage.login(userName, VALID_PASSWORD);
      await expect(page).toHaveURL(Urls.INVENTORY_URL);
      await expect(inventory.title).toHaveText("Products");
    });
  });
});

test.describe("Invalid Login Tests", () => {
  INVALID_USERS.forEach((user) => {
    test(`Login with username:${user.username} and password:${user.password}`, async ({
      page,
    }) => {
      const loginPage = new Login(page);
      await loginPage.openLoginPage();
      await loginPage.login(user.username, user.password);
      await expect(page).toHaveURL(BASE_URL);
      await expect(loginPage.errorMessage).toHaveText(user.errorMessage);
    });
  });
});
