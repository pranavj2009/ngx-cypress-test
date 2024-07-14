/// <reference types="cypress" />
//const { beforeEach } = require("node:test")
const { onDatePickerPage } = require("../support/page_objects/datePickerPage")
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutPage")
const { navigateTo } = require("../support/page_objects/navigationPage")

describe('Test with page objects', () => {
    /**
     * This code runs before each test
     */
    beforeEach('Open application', () => {
        cy.openHomePage()
    })

    /**
     * Test to verify all the navigations
     */
    it('Verifying navigation across the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.toastrPage();
        navigateTo.toolTipPage();
    })

    it('Submit inline form with name and email', ()=> {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('John Smith', 'test@email.com')
    })

    it.only('Should submit inline form and Basic form and select tomorrows date in calendar', ()=> {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('John Smith', 'test@email.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@email.com', 'password')

        cy.wait(500)
        navigateTo.datePickerPage()
        onDatePickerPage.enterCommonDatePickerDateDaysAfterTodaysDate(60)
        
    })  
})