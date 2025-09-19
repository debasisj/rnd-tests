import { faker } from '@faker-js/faker';

export interface UserData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrationData {
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
}

export class TestDataFactory {
    static generateValidUserData(): UserData {
        const password = this.generateValidPassword();
        return {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: password,
            confirmPassword: password
        };
    }

    static generateRegistrationData(): RegistrationData {
        const password = this.generateValidPassword();

        return {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: password,
            confirmPassword: password,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phoneNumber: faker.phone.number(),
            country: 'Australia',
            city: faker.location.city(),
            address: faker.location.streetAddress(),
            state: faker.location.state(),
            postalCode: faker.location.zipCode()
        };
    }

    static generateAustralianRegistrationData(): RegistrationData {
        const password = this.generateValidPassword();

        // Australian-specific data
        const australianStates = ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'];
        const australianCities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra'];

        return {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: password,
            confirmPassword: password,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phoneNumber: `+61 ${faker.string.numeric(1)} ${faker.string.numeric(4)} ${faker.string.numeric(4)}`, // Australian phone format
            country: 'Australia',
            city: faker.helpers.arrayElement(australianCities),
            address: `${faker.location.buildingNumber()} ${faker.location.street()}`,
            state: faker.helpers.arrayElement(australianStates),
            postalCode: faker.string.numeric(4) // Australian postal codes are 4 digits
        };
    }

    static generateValidPassword(): string {
        // Generate password that meets all requirements:
        // - 4-12 characters
        // - At least one lowercase letter
        // - At least one uppercase letter  
        // - At least one number
        const lowercase = faker.string.alpha({ length: 2, casing: 'lower' });
        const uppercase = faker.string.alpha({ length: 1, casing: 'upper' });
        const numbers = faker.string.numeric({ length: 2 });
        const additional = faker.string.alphanumeric({ length: 2 });

        // Combine and shuffle
        const password = (lowercase + uppercase + numbers + additional).split('').sort(() => 0.5 - Math.random()).join('');
        return password.substring(0, 8); // Keep within 4-12 character limit
    }

    static generateInvalidData() {
        return {
            emptyUsername: '',
            emptyEmail: '',
            emptyPassword: '',
            invalidEmail: 'invalid-email',
            shortPassword: '123',
            longPassword: 'ThisPasswordIsTooLongForTheValidationRules',
            passwordWithoutNumbers: 'NoNumbers',
            passwordWithoutUppercase: 'nouppercase123',
            passwordWithoutLowercase: 'NOLOWERCASE123'
        };
    }

    static generateUserDataWithMismatchedPasswords(): UserData {
        return {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: this.generateValidPassword(),
            confirmPassword: this.generateValidPassword() // Different password
        };
    }

    static generateInvalidUserData() {
        return {
            invalidEmail: 'invalid-email-format',
            emptyUsername: '',
            emptyEmail: '',
            emptyPassword: '',
            shortPassword: '123',
            longPassword: 'ThisPasswordIsTooLongForTheValidationRules',
            passwordWithoutNumbers: 'NoNumbers',
            passwordWithoutUppercase: 'nouppercase123',
            passwordWithoutLowercase: 'NOLOWERCASE123'
        };
    }
}
