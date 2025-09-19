# Registration Form Automation Tests

This project contains Playwright tests for the Advantage Online Shopping registration form using the Page Object Model pattern and faker.js for test data generation.

## Project Structure

```
tests/
├── pages/
│   └── RegistrationPage.ts                         # Page Object Model for registration page
├── utils/
│   └── TestDataFactory.ts                          # Test data generation using faker.js
└── registration.spec.ts                            # Test specifications
└── registrationFieldValidations.spec.ts            # Test specifications
```

## Features

- **Page Object Model**: Clean separation of page interactions and test logic
- **Faker.js Integration**: Dynamic test data generation for realistic testing
- **Comprehensive Validation Testing**: Tests for all form field validations
- **Error Message Verification**: Validates error messages appear and disappear correctly
- **Cross-browser Testing**: Configured for Chromium, Firefox, and WebKit


## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Quick Commands (using npm scripts):

```bash
# Run demo tests (works offline)
npm run test:demo

# Test website connectivity
npm run test:connectivity

# Run full registration tests
npm run test:registration

# Run tests with browser UI visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests only on Chromium
npm run test:chromium

# View test report
npm run test:report
```

### Detailed Commands:

#### Run all tests:
```bash
npx playwright test registration.spec.ts
```

#### Run tests in headed mode (with browser UI):
```bash
npx playwright test registration.spec.ts --headed
```

#### Run tests on specific browser:
```bash
npx playwright test registration.spec.ts --project=chromium
```

#### Run with debug mode:
```bash
npx playwright test registration.spec.ts --debug
```

## Page Object Model Implementation

### RegistrationPage.ts
The `RegistrationPage` class encapsulates all interactions with the registration form:

- **Navigation methods**: Navigate to site, open login popup, click create account
- **Form interaction methods**: Fill fields, click fields, trigger validation
- **Validation methods**: Check error visibility, get error text
- **State verification methods**: Check form completion, button states

### TestDataFactory.ts
The `TestDataFactory` class provides methods for generating test data:

- `generateValidUserData()`: Creates complete valid user data
- `generateValidPassword()`: Creates password meeting all requirements
- `generateInvalidUserData()`: Provides various invalid data scenarios
- `generateUserDataWithMismatchedPasswords()`: Creates mismatched password scenario

## Key Features of the Implementation

### Robust Locator Strategy
- Uses specific selectors to avoid element conflicts
- Scopes error message locators to specific containers
- Handles dynamic content loading

### Wait Strategies
- Waits for page navigation and network idle
- Waits for specific elements to be visible
- Includes timeout handling for unreliable connections

### Test Data Generation
```typescript
// Example usage of faker.js integration
const userData = TestDataFactory.generateValidUserData();
// userData = {
//   username: "john_doe123",
//   email: "john.doe@example.com", 
//   password: "Test123a",
//   confirmPassword: "Test123a"
// }
```

### Error Handling
- Specific error message validation
- Timeout handling for slow connections
- Cross-browser compatibility considerations

## Troubleshooting

### Connection Issues
If you encounter "Connection Refused" errors:
1. Verify the website is accessible: https://www.advantageonlineshopping.com
2. Check your internet connection
3. Try running tests at a different time

### Element Not Found Issues
- The site may have updated its structure
- Check browser developer tools for current element selectors
- Update locators in `RegistrationPage.ts` if needed

### Timing Issues
- Increase timeouts in `playwright.config.ts` if needed
- Add explicit waits for slow-loading elements
- Use `--headed` mode to debug timing visually

## Test Execution Report

Run tests and view detailed reports:
```bash
npx playwright test registration.spec.ts
npx playwright show-report
```

The HTML report provides:
- Test execution timeline
- Screenshots of failures
- Detailed error logs
- Performance metrics

## Extending the Tests

To add new test scenarios:

1. Add new methods to `RegistrationPage.ts` for page interactions
2. Create new test cases in `registration.spec.ts`
3. Use `TestDataFactory` for generating appropriate test data
4. Follow the existing pattern of step-by-step validation

Example:
```typescript
test('should validate phone number format', async () => {
  const invalidPhone = TestDataFactory.generateInvalidPhoneNumber();
  await registrationPage.fillPhoneNumber(invalidPhone);
  await registrationPage.clickOutsideForm();
  await expect(registrationPage.phoneErrorMessage).toBeVisible();
});
```
