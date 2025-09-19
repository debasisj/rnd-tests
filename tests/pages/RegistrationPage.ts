import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly userMenuIcon: Locator;
  readonly createNewAccountLink: Locator;
  readonly usernameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;

  // Address fields
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly phoneNumberField: Locator;
  readonly countryDropdown: Locator;
  readonly cityField: Locator;
  readonly addressField: Locator;
  readonly stateProvinceField: Locator;
  readonly postalCodeField: Locator;

  // Terms and Conditions
  readonly agreeToTermsCheckbox: Locator;

  readonly registerButton: Locator;

  // Error message locators
  readonly usernameErrorMessage: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly confirmPasswordErrorMessage: Locator;

  // Password requirements locators
  readonly passwordRequirements: string[];
  readonly confirmPasswordRequirement: Locator;

  // Success/Login status elements
  readonly userMenuLoggedIn: Locator;
  readonly logoutOption: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation elements
    this.userMenuIcon = page.getByRole('link', { name: 'UserMenu' });
    this.createNewAccountLink = page.getByRole('link', {
      name: 'CREATE NEW ACCOUNT',
    });

    // Form fields - Account details
    this.usernameField = page.locator('input[name="usernameRegisterPage"]');
    this.emailField = page.locator('input[name="emailRegisterPage"]');
    this.passwordField = page.locator('input[name="passwordRegisterPage"]');
    this.confirmPasswordField = page.locator(
      'input[name="confirm_passwordRegisterPage"]'
    );

    // Form fields - Personal details
    this.firstNameField = page.locator('input[name="first_nameRegisterPage"]');
    this.lastNameField = page.locator('input[name="last_nameRegisterPage"]');
    this.phoneNumberField = page.locator(
      'input[name="phone_numberRegisterPage"]'
    );

    // Address fields
    this.countryDropdown = page.locator(
      'select[name="countryListboxRegisterPage"]'
    );
    this.cityField = page.locator('input[name="cityRegisterPage"]');
    this.addressField = page.locator('input[name="addressRegisterPage"]');
    this.stateProvinceField = page.locator(
      'input[name="state_/_province_/_regionRegisterPage"]'
    );
    this.postalCodeField = page.locator(
      'input[name="postal_codeRegisterPage"]'
    );

    // Terms and Conditions
    this.agreeToTermsCheckbox = page.locator('[name="i_agree"]');

    this.registerButton = page.getByRole('button', { name: 'REGISTER' });

    // Error messages - make them more specific to avoid multiple matches
    this.usernameErrorMessage = page
      .locator('#formCover')
      .getByText('Username field is required', { exact: true });
    this.emailErrorMessage = page
      .locator('#formCover')
      .getByText('Email field is required', { exact: true });
    this.passwordErrorMessage = page
      .locator('#formCover')
      .getByText('Password field is required', { exact: true });
    this.confirmPasswordErrorMessage = page
      .locator('#formCover')
      .locator('text=Same as Password');

    // Password requirements
    this.passwordRequirements = [
      '- Use  4 character or longer ',
      '- Use maximum 12 character ',
      '- Including at least one lower letter ',
      '- Including at least one upper letter ',
      '- Including at least one number ',
    ];
    this.confirmPasswordRequirement = page
      .locator('#formCover')
      .locator('text=Same as Password');

    // Success/Login status elements
    this.userMenuLoggedIn = page.locator('#menuUserLink span');
    this.logoutOption = page.getByRole('link', { name: 'Sign out' });
  }

  async navigate() {
    await this.page.goto('https://www.advantageonlineshopping.com');
  }

  async openLoginPopup() {
    await this.userMenuIcon.click();
  }

  async clickCreateNewAccount() {
    await this.createNewAccountLink.click();
    // Wait for navigation and page to stabilize
    await this.page.waitForTimeout(1000);
  }

  async fillUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordField.fill(confirmPassword);
  }

  // Personal details methods
  async fillFirstName(firstName: string) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  // Address details methods
  async selectCountry(country: string) {
    await this.countryDropdown.selectOption({ label: country });
  }

  async fillCity(city: string) {
    await this.cityField.fill(city);
  }

  async fillAddress(address: string) {
    await this.addressField.fill(address);
  }

  async fillStateProvince(state: string) {
    await this.stateProvinceField.fill(state);
  }

  async fillPostalCode(postalCode: string) {
    await this.postalCodeField.fill(postalCode);
  }

  async agreeToTerms() {
    await this.agreeToTermsCheckbox.check();
  }

  // Complete registration method
  async fillCompleteRegistrationForm(userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    country: string;
    city: string;
    address: string;
    state: string;
    postalCode: string;
  }) {
    await this.fillUsername(userData.username);
    await this.fillEmail(userData.email);
    await this.fillPassword(userData.password);
    await this.fillConfirmPassword(userData.confirmPassword);
    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillPhoneNumber(userData.phoneNumber);
    await this.selectCountry(userData.country);
    await this.fillCity(userData.city);
    await this.fillAddress(userData.address);
    await this.fillStateProvince(userData.state);
    await this.fillPostalCode(userData.postalCode);
  }

  async submitRegistration() {
    await this.registerButton.click();
    // Wait for registration to complete
    await this.page.waitForTimeout(2000);
  }

  async clickUsernameField() {
    await this.usernameField.click();
  }

  async clickEmailField() {
    await this.emailField.click();
  }

  async clickPasswordField() {
    await this.passwordField.click();
  }

  async clickConfirmPasswordField() {
    await this.confirmPasswordField.click();
  }

  async clickOutsideForm() {
    // Click on a neutral area outside the form to trigger blur events
    await this.page.locator('h3:text("CREATE ACCOUNT")').click();
  }

  async isUsernameErrorVisible(): Promise<boolean> {
    return await this.usernameErrorMessage.isVisible();
  }

  async isEmailErrorVisible(): Promise<boolean> {
    return await this.emailErrorMessage.isVisible();
  }

  async isPasswordErrorVisible(): Promise<boolean> {
    return await this.passwordErrorMessage.isVisible();
  }

  async isConfirmPasswordErrorVisible(): Promise<boolean> {
    return await this.confirmPasswordErrorMessage.isVisible();
  }

  async arePasswordRequirementsVisible(): Promise<boolean> {
    let allVisible = true;
    for (const requirementText of this.passwordRequirements) {
      const requirementLocator = this.page.locator(
        `#formCover >> text=${requirementText}`
      );
      if (!(await requirementLocator.isVisible())) {
        allVisible = false;
        break;
      }
    }
    return allVisible;
  }

  async isConfirmPasswordRequirementVisible(): Promise<boolean> {
    return await this.confirmPasswordRequirement.isVisible();
  }

  async getUsernameErrorText(): Promise<string> {
    return (await this.usernameErrorMessage.textContent()) || '';
  }

  async getEmailErrorText(): Promise<string> {
    return (await this.emailErrorMessage.textContent()) || '';
  }

  async getPasswordErrorText(): Promise<string> {
    return (await this.passwordErrorMessage.textContent()) || '';
  }

  async getConfirmPasswordErrorText(): Promise<string> {
    return (await this.confirmPasswordErrorMessage.textContent()) || '';
  }

  async isRegisterButtonEnabled(): Promise<boolean> {
    await this.registerButton.waitFor({ state: 'visible' });
    await this.registerButton.scrollIntoViewIfNeeded();
    return await this.registerButton.isEnabled();
  }

  // Login status validation methods
  async isUserLoggedIn(): Promise<boolean> {
    try {
      // Check if user menu shows username instead of "Hi" or login option
      await this.userMenuLoggedIn.waitFor({ state: 'visible', timeout: 5000 });
      const userMenuText = await this.userMenuLoggedIn.textContent();
      // If it shows a username instead of default text, user is logged in
      return (
        userMenuText !== null &&
        userMenuText.trim() !== '' &&
        userMenuText !== 'Hi'
      );
    } catch {
      return false;
    }
  }

  async getLoggedInUsername(): Promise<string> {
    try {
      await this.userMenuLoggedIn.waitFor({ state: 'visible', timeout: 5000 });
      return (await this.userMenuLoggedIn.textContent()) || '';
    } catch {
      return '';
    }
  }

  async logOutButton(): Promise<Locator | null> {
    try {
      await this.userMenuIcon.click();
      return this.logoutOption;
    } catch {
      return null;
    }
  }

  async hasAllFieldsValidData(): Promise<boolean> {
    // Check if all required fields have values
    const usernameValue = await this.usernameField.inputValue();
    const emailValue = await this.emailField.inputValue();
    const passwordValue = await this.passwordField.inputValue();
    const confirmPasswordValue = await this.confirmPasswordField.inputValue();

    return !!(
      usernameValue &&
      emailValue &&
      passwordValue &&
      confirmPasswordValue
    );
  }

  async waitForPageToLoad() {
    // Wait for registration page to load
    await this.page.waitForURL('**/register', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    // Wait for form to be fully loaded
    await this.usernameField.waitFor({ state: 'visible' });
  }

  async tabOut() {
    await this.page.keyboard.press('Tab');
  }
}
