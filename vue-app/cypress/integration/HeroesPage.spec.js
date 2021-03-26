/// <reference types="cypress"/>

const HEROES = [
    {
        "id": "HeroAslaug",
        "name": "Aslaug",
        "description": "warrior queen"
    },
    {
        "id": "HeroBjorn",
        "name": "Bjorn Ironside",
        "description": "king of 9th century Sweden"
    },
];

describe('Heroes Page', () => {
    beforeEach(() => {
        cy.getCommand('/api/heroes', HEROES);
        cy.visit('/');
    });

    it('should land on the heroes page', () => {
        cy.location('pathname').should('equal', '/heroes');
    });

    it('should render heroes', () => {
        cy.get('[data-testid=card]').should('have.length', 2);
    });

    it('should not delete a hero when No is clicked', () => {
        const index = 1;

        cy.get('[data-testid=button]').filter(':contains("Delete")').eq(index).click();
        cy.get('[data-testid=no-button]').click();

        cy.get('[data-testid=card]').should('have.length', HEROES.length);

    });

    it('should delete a hero when Yes is clicked', () => {
        const index = 1;

        cy.deleteCommand('/api/heroes/*', HEROES, index)

        cy.get('[data-testid=button]').filter(':contains("Delete")').eq(index).click();
        cy.get('[data-testid=yes-button]').click();

        cy.get('[data-testid=card]').should('have.length', HEROES.length - 1 );
    });

    it('should not add a new hero when Cancel is clicked', () => {
        cy.get('[data-testid=add-button]',).click();
        cy.SetupInputFieldsCommand();
        cy.get('@Name').type("Harley");
        cy.get('@Description').type("Crazy Bitch");
        cy.get('[data-testid=button]').contains('Cancel').click();

    });

    it('should add a new hero when Save is clicked', () => {
        const name = "Ragnar";
        const description = "Viking Warrior";

        cy.get('[data-testid=add-button]',).click();
        cy.SetupInputFieldsCommand();
        cy.get('@Name').type(name);
        cy.get('@Description').type(description);
        cy.postCommand('/heroes', {name, description});
        cy.get('[data-testid=button]').contains('Save').click();

        cy.get('[data-testid=card]').should('have.length', HEROES.length + 1);
    });

    it('should be able to edit an existing hero', () => {
        const index = 0;
        const heroToEdit = HEROES[index];
        const editedDescription = 'Warped Queen'

        cy.get('[data-testid=button]').filter(':contains("Edit")').eq(index).click();

        cy.SetupInputFieldsCommand();

        cy.get('@Description').clear().type(editedDescription);
        cy.putCommand('/heroes', {...heroToEdit, description: editedDescription});
        cy.get('[data-testid=button]').contains('Save').click();

        cy.get('[data-testid=card-name]').should('have.length', HEROES.length);
        cy.get('[data-testid=card-description]').eq(index).should('contain', 'Warped');
    });
});

