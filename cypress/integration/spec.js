describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'WikiTabs');
	});

	it('navigates to /popular', () => {
		cy.get('nav a').contains('popular').click();
		cy.url().should('include', '/popular');
	});

	it('navigates to /tablog', () => {
		cy.get('nav a').contains('tablog').click();
		cy.url().should('include', '/tablog');
	});
});
