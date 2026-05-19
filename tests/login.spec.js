import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import { BASE_URL, Urls } from "../data/Urls";
import {
  VALID_PASSWORD,
  LOCKED_OUT_USER,
  VALID_USERS,
  INVALID_PASSWORD,
  INVALID_USER,
} from "../data/users";
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
  test("Login with locked out user", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(LOCKED_OUT_USER, VALID_PASSWORD);
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.LOCKED_OUT_USER,
    );
  });
  test("Login with invalid password", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(validUser, INVALID_PASSWORD);
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
    );
  });
  test("Login with invalid username", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(INVALID_USER, VALID_PASSWORD);
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
    );
  });
  test("Login with invalid username and password", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(INVALID_USER, INVALID_PASSWORD);
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
    );
  });
  test("Login with missing username", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login("", VALID_PASSWORD);
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.MISSING_USERNAME,
    );
  });
  test("Login with missing password", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(validUser, "");
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.MISSING_PASSWORD,
    );
  });
  test("Login with missing username and password", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login("", "");
    await expect(page).toHaveURL(BASE_URL);
    await expect(loginPage.errorMessage).toHaveText(
      ERROR_MESSAGES.MISSING_USERNAME,
    );
  });
});
