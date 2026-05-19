import { test, expect } from "@playwright/test";
import { VALID_PASSWORD, VALID_USERS } from "../data/users";
import { CheckOutStepOne } from "../pages/CheckOutStepOne";
import { CheckOutStepTwo } from "../pages/CheckOutStepTwo";
import { CheckOutComplete } from "../pages/CheckOutComplete";
import { Inventory } from "../pages/Inventory";
import { ShoppingCart } from "../pages/Cart";
import { Urls } from "../data/urls";
import { Login } from "../pages/Login";
import { userDetails } from "../data/details";

const validUser = VALID_USERS.find((user) => user === "standard_user");

test.describe("Sanity Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(validUser, VALID_PASSWORD);
    const inventory = new Inventory(page);
    await expect(page).toHaveURL(Urls.INVENTORY_URL);
    await expect(inventory.title).toHaveText("Products");
  });

  test("Basic purchase functionality", async ({ page }) => {
    const loginPage = new Login(page);
    await loginPage.openLoginPage();
    await loginPage.login(validUser, VALID_PASSWORD);
    await expect(page).toHaveURL(Urls.INVENTORY_URL);

    const inventory = new Inventory(page);
    await expect(inventory.title).toHaveText("Products");
    await inventory.addToCartBackPackButton.click();
    await inventory.addToCartBoltTShirtButton.click();
    await expect(inventory.shoppingCartBadge).toHaveText("2");
    await inventory.shoppingCartLink.click();

    const shoppingCart = new ShoppingCart(page);
    await expect(page).toHaveURL(Urls.CART_URL);
    await expect(shoppingCart.title).toHaveText("Your Cart");
    await expect(shoppingCart.cartItems).toHaveCount(2);
    await shoppingCart.CheckoutButton.click();

    const checkOutStepOne = new CheckOutStepOne(page);
    await expect(page).toHaveURL(Urls.CHECKOUT_STEP_ONE_URL);
    await expect(checkOutStepOne.title).toHaveText(
      "Checkout: Your Information",
    );
    await checkOutStepOne.fillCheckOutStepOneForm(userDetails);

    const checkOutStepTwo = new CheckOutStepTwo(page);
    await expect(page).toHaveURL(Urls.CHECKOUT_STEP_TWO_URL);
    await expect(checkOutStepTwo.title).toHaveText("Checkout: Overview");
    await checkOutStepTwo.finishCheckOut();

    const checkOutComplete = new CheckOutComplete(page);
    await expect(page).toHaveURL(Urls.CHECKOUT_COMPLETE_URL);
    await expect(checkOutComplete.title).toHaveText("Checkout: Complete!");
    await expect(checkOutComplete.Header).toHaveText(
      "Thank you for your order!",
    );
  });
});
