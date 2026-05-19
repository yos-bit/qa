import { test, expect } from "@playwright/test";
import { standerdUser } from "../Data/users";
import { CheckOutStepOne } from "../pages/CheckOutStepOne";
import { CheckOutStepTwo } from "../pages/CheckOutStepTwo";
import { CheckOutComplete } from "../pages/CheckOutComplete";
import { Inventory } from "../pages/inventory";
import { ShoppingCart } from "../pages/Cart";
import { Urls } from "../Data/Urls";
import { LoginPage } from "../pages/LoginPage";
import { userDetails } from "../Data/details";

test.describe("Sanity Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(standerdUser.username, standerdUser.password);
    const inventory = new Inventory(page);
    await expect(page).toHaveURL(Urls.INVENTORY_URL);
    await expect(inventory.title).toHaveText("Products");
  });

  test("Login with standard_user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(standerdUser.username, standerdUser.password);
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
