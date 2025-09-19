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
- **Environment Variable Browser Selection**: Dynamic browser configuration via BROWSER env var
- **CI/CD Ready**: GitHub Actions workflow with optimized Chromium-only testing


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

# Run tests on specific browsers (using environment variables)
npm run test:chromium    # BROWSER=chromium
npm run test:firefox     # BROWSER=firefox  
npm run test:webkit      # BROWSER=webkit
npm run test:edge        # BROWSER=edge
npm run test:all         # BROWSER=all (runs on all browsers)

# View test report
npm run test:report
```

### Environment Variable Browser Selection:

You can also set the browser dynamically using the `BROWSER` environment variable:

```bash
# Run tests on specific browsers
BROWSER=firefox npm run test
BROWSER=webkit npm run test
BROWSER=edge npm run test
BROWSER=all npm run test

# Default behavior (chromium if not specified)
npm run test
```

**Supported BROWSER values:**
- `chromium` - Desktop Chrome (default)
- `firefox` - Desktop Firefox
- `webkit` - Desktop Safari
- `edge` - Desktop Edge
- `all` - Run tests on all browsers

### Detailed Commands:

# Using environment variables (recommended)
BROWSER=firefox npx playwright test registration.spec.ts
BROWSER=webkit npx playwright test registration.spec.ts
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

## CI/CD Integration

### GitHub Actions
This project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that automatically runs tests on every push to main branch and pull requests.

**Current Configuration:**
- **Trigger**: Push to `main` branch or pull requests
- **Browser**: Chromium only (optimized for faster CI/CD execution)
- **Command**: `npm run test:chromium`


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