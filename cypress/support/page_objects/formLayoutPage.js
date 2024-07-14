/// <reference types="cypress" />

export class FormLayoutPage{
    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').clear().type(name)
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit();
        })
    }

    submitBasicFormWithEmailAndPassword(email, password){
        cy.contains('Basic form').siblings('nb-card-body').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email)
            cy.wrap(form).find('[placeholder="Password"]').clear().type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit()
        })
    }
}

export const onFormLayoutsPage = new FormLayoutPage()