import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage';
import { TestDataFactory } from './utils/TestDataFactory';

test.describe('Successful Registration Tests', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
    await registrationPage.openLoginPopup();
    await registrationPage.clickCreateNewAccount();
    await registrationPage.waitForPageToLoad();
  });

  test('Successful registration with complete Australian address details and login verification', async () => {
    // Generate test data with Australian address
    const userData = TestDataFactory.generateAustralianRegistrationData();

    console.log('Generated test data:', {
      username: userData.username,
      email: userData.email,
      country: userData.country,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
    });

    // Fill all registration form fields
    await test.step('Fill account details', async () => {
      await registrationPage.fillUsername(userData.username);
      await registrationPage.fillEmail(userData.email);
      await registrationPage.fillPassword(userData.password);
      await registrationPage.fillConfirmPassword(userData.confirmPassword);
    });

    await test.step('Fill personal details', async () => {
      await registrationPage.fillFirstName(userData.firstName);
      await registrationPage.fillLastName(userData.lastName);
      await registrationPage.fillPhoneNumber(userData.phoneNumber);
    });

    await test.step('Fill address details', async () => {
      await registrationPage.selectCountry(userData.country);
      await registrationPage.fillCity(userData.city);
      await registrationPage.fillAddress(userData.address);
      await registrationPage.fillStateProvince(userData.state);
      await registrationPage.fillPostalCode(userData.postalCode);
    });

    // Agree to Terms and Conditions
    await test.step('Agree to Terms and Conditions', async () => {
      await registrationPage.agreeToTerms();
    });

    // Verify register button is enabled
    await test.step('Verify form completion', async () => {
      expect(await registrationPage.isRegisterButtonEnabled()).toBe(true);
      expect(await registrationPage.hasAllFieldsValidData()).toBe(true);
    });

    // Submit registration
    await test.step('Submit registration', async () => {
      await registrationPage.submitRegistration();
    });

    // Verify successful registration and login status
    await test.step('Verify user is logged in after registration', async () => {
      // Check if user is logged in
      const isLoggedIn = await registrationPage.isUserLoggedIn();
      expect(isLoggedIn).toBe(true);

      // Verify username appears in the user menu
      const loggedInUsername = await registrationPage.getLoggedInUsername();
      expect(loggedInUsername.toLowerCase()).toBe(
        userData.username.toLowerCase()
      );

      // Verify logout option is available
      const logoutButton = await registrationPage.logOutButton();
      await expect(logoutButton!).toBeVisible({ timeout: 5_000 });
    });
  });
});
