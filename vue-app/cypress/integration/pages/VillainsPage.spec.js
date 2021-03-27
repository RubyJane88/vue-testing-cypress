/// <reference types="cypress"/>

const VILLAINS = [
    {
        "id": "VillainElla",
        "name": "Ella",
        "description": "fashionista"
    },
    {
        "id": "VillainLandon",
        "name": "Landon",
        "description": "Mandalorian mauler"
    }
];

describe('Villains Page', () => {
    beforeEach(() => {
    cy.getCommand('/api/villains', VILLAINS);
    cy.visit('/');
    cy.get('[data-testid=nav-villains]').click();
    });

    it('should land on the village page', () => {
        cy.location('pathname').should('equal', '/villains');
    });

    it('should render two villains', () => {
        cy.get('[data-testid=villains-card]').should('have.length', 2);
    });

    it('should not delete a villain when No is clicked', () => {
        const index = 1;

        cy.get('[data-testid=button]').filter(':Contains("Delete")').eq(index).click();
        cy.get('[data-testid=no-button]').click();

        cy.get('[data-testid=villains-card]').should('have.length', VILLAINS.length);

    });

     it('should delete a villain when Yes is clicked', () => {
         const index = 1;
         cy.deleteCommand('/api/villains/*', VILLAINS, index);

         cy.get('[data-testid=button]').filter(':Contains("Delete")').eq(index).click();
         cy.get('[data-testid=yes-button]').click();

         cy.get('[data-testid=villains-card]').should('have.length', VILLAINS.length - 1);
     });

it('should add a new villain when Save is clicked', () => {
  const name = "Luna";
  const description = "Dark Princess";

  cy.get('[data-testid=add-button]').click();
  cy.SetupInputFieldsCommand();
  cy.get('@Name').type(name);
  cy.get('@Description').type(description);
  cy.postCommand('/villains', {name, description});
  cy.get('[data-testid=button]').contains('Save').click();

  cy.get('[data-testid=villains-card]').should('have.length', VILLAINS.length +1)});

it('should edit an existing villain',() => {
   const index = 0;
   const villainToEdit = VILLAINS[index];
   const editedDescription ="Moon Warrior";

   cy.get('[data-testid=button]').filter(':contains("Edit")').eq(index).click();
   cy.SetupInputFieldsCommand();
   cy.get('@Description').type(editedDescription);
   cy.putCommand('/api/villains', {
       ...villainToEdit, description: editedDescription,
   });
   cy.get('[data-testid=button]').contains('Save').click();

   cy.get('[data-testid=villains-card]').should('have.length', VILLAINS.length);
   cy.get('[data-testid=card-description]').eq(index).should('contain', 'Warrior');

});

    it('should refresh villains', () => {
        cy.get('[data-testid=refresh-button]').click();
        cy.get('[data-testid=villains-card]').should('have.length', 1);
    })

})
