describe('Authentication Flow (E2E Test)', () => {
    it('should allow a new user to register', () => {
        const uniqueUsername = `TestUser_${Date.now()}`;
        const uniqueEmail = `test_${Date.now()}@user.com`;
        const password = 'password123';

        cy.visit('/auth?mode=signup');

        cy.get('input[name="username"]').type(uniqueUsername);
        cy.get('input[name="email"]').type(uniqueEmail);
        cy.get('input[name="password"]').type(password);
        cy.get('input[name="confirm-password"]').type(password);

        cy.get('button').contains('Зареєструватись').click();

        cy.url().should('include', '/auth?mode=login');
        cy.log('Registration test successful!');
    });

    it('should allow an existing, VERIFIED user to login', () => {
        const existingUserEmail = 'test@example.com';
        const existingUserPassword = 'password123';

        cy.visit('/auth?mode=login');

        cy.get('input[name="username-email"]').type(existingUserEmail);
        cy.get('input[name="password"]').type(existingUserPassword);

        cy.get('button').contains('Увійти').click();

        cy.url().should('include', '/profile');

        cy.get('[data-testid="main-navigation"]').should('contain', 'Профіль');
        cy.get('[data-testid="main-navigation"]').should('contain', 'Вийти');
        cy.log('Login test successful!');
    });
});
