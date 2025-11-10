describe('Product Management Flow (E2E Test)', () => {
    const existingUserEmail = 'test@example.com';
    const existingUserPassword = 'password123';

    const productName = `Cypress Test Product ${Date.now()}`;
    const productPrice = '999';

    beforeEach(() => {
        cy.visit('/auth?mode=login');
        cy.get('input[name="username-email"]').type(existingUserEmail);
        cy.get('input[name="password"]').type(existingUserPassword);
        cy.get('button').contains('Увійти').click();
        cy.url().should('include', '/profile');
    });

    it('should allow a user to create, view, and delete a product', () => {
        cy.visit('/profile/new-product');

        cy.get('input[name="name"]').type(productName);
        cy.get('input[name="price"]').type(productPrice);

        cy.contains('Категорія').click();

        cy.get('[data-testid="dropdown-list"]').contains('Тварини').click();

        cy.contains('Гуртожиток').click();
        cy.get('[data-testid="dropdown-list"]').contains('18').click();

        cy.get('textarea[name="description"]').type('This is an E2E test description.');

        cy.get('button').contains('Опублікувати').click();

        cy.url().should('include', '/profile/user-products');
        cy.log('Product creation successful!');

        cy.contains(productName);
        cy.contains(productPrice);

        cy.contains(productName).click();

        cy.url().should('include', '/product/');
        cy.contains(productName);

        cy.on('window:confirm', () => true);
        cy.get('button').contains('Видалити').click();

        cy.url().should('include', '/profile/user-products');

        cy.contains(productName).should('not.exist');
        cy.log('Product deletion successful!');
    });
});