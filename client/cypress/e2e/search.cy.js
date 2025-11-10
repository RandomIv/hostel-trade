describe('Search, Filter, and Favorite Flow (E2E Test)', () => {
    const existingUserEmail = 'test@example.com';
    const existingUserPassword = 'password123';

    it('should allow a GUEST to search and filter products', () => {
        cy.visit('/search');

        cy.get('input[name="name"]').type('Cypress');
        cy.get('button').contains('Пошук').click();

        cy.url().should('include', 'name=Cypress');

        cy.get('[data-testid="filter-toggle-btn"]').click();

        cy.contains('Категорія').click();
        cy.get('[data-testid="dropdown-list"]').contains('Тварини').click();

        cy.get('button').contains('Пошук').click();

        cy.url().should('include', 'typeId=');
    });

    it('should redirect a GUEST to login when clicking "Like"', () => {
        cy.visit('/search');

        cy.get('[data-testid="like-btn"]').first().click();

        cy.url().should('include', '/auth?mode=login');
    });

    it('should allow a LOGGED-IN user to "Like" a product', () => {
        cy.visit('/auth?mode=login');
        cy.get('input[name="username-email"]').type(existingUserEmail);
        cy.get('input[name="password"]').type(existingUserPassword);
        cy.get('button').contains('Увійти').click();
        cy.url().should('include', '/profile');

        cy.visit('/search');

        cy.get('[data-testid="like-btn"]').first().click();

        cy.url().should('include', '/search');

        cy.get('[data-testid="like-btn"]').first().find('i').should('have.class', 'fa-solid');
    });
});