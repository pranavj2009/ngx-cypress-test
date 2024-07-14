/// <reference types="cypress" />

describe('First suite test', () => {
    it('First test', ()=>{
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();
    })

    /**
     * This test has all the ways for locating elements
     */
    //get() find element by locator globally
    //find() find child elements by locator
    //contains() find HTML text and by text and locator
    //parents() go to parent element of the element

    it('Locator techniques and methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('Sign in')

        //Finding 2nd Sign in button in 'Horizontal form' section based on Email input box
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in')

        cy.contains('nb-card', 'Horizontal form').get('button')


        
    })

    it('Validate Submit button in Block Form', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('Basic form').parent('nb-card').find('form').find('button').should('contain', 'Submit')
    })

    it('Save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //Instead use alias for common element in this case 'Using the grid'
        //-- 1) Using cyprus alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        //-- 2) Using then()
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('Extracting text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card-header', 'Block form').parent('nb-card').children('nb-card-body').as('blockFormBody')
        let firstNameText = '';
        cy.get('@blockFormBody').find('label[for="inputFirstName"]').then(firstNameLabel => {
            firstNameText = firstNameLabel.text()
            //Since firstNameText is a JQueryElement, we can use Chai assertions. 'expect'
            expect(firstNameText).to.equal('First Name')

            //Or if we want to use cypress assetions we can use cy wrap
            cy.wrap(firstNameText).should('contain', 'First Name');
        })

        //Another approach is using 'invoke' method
        cy.get('@blockFormBody').find('label[for="inputFirstName"]').invoke('text').should('contain', 'First Name')
        cy.get('@blockFormBody').find('label[for="inputFirstName"]').invoke('text').then(text => {
            expect(text).to.equal('First Name')
        })

        //To use a value later even after performing assertion, we can use 'as' to store it into an alias
        cy.get('@blockFormBody').find('label[for="inputFirstName"]').invoke('text').as('firstNameText').should('contain', 'First Name')
        cy.get('@firstNameText').then(text => {expect(text).to.equal('First Name')})
    
    })

    it('Typing text into input field and validating it', ()=>{
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        //Type the value
        cy.get('#inputEmail1').type('test@email.com')

        //Get the value
        cy.get('#inputEmail1').invoke('prop','value').should('contain', 'test@email.com')
        cy.get('#inputEmail1').invoke('prop','value').then(inputValue => {
            expect(inputValue).to.equal('test@email.com')
        })
    })

    it('Use invoke to get webelement attribute and type', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Check if element class attribute is 'input'
        cy.get('#inputEmail1').invoke('attr','class').should('contain', 'input')
    })

    it('Radio boxes', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Selecting all radio boxes
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('Check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //Selecting all radio boxes
       //cy.get('[type="checkbox"]').check({force: true}).should('be.checked')

       //Selecting individual
       cy.contains('Prevent arising of duplicate toast').find('[type="checkbox"]').check({force: true}).should('be.checked')
    })

    it('Date picker', () =>{
        function selectDayFromCurrent(numberOfDays)
            {
                let days = numberOfDays
                let daysAfterDate = new Date()
                daysAfterDate.setDate(daysAfterDate.getDate()+days)
                let inputDate = daysAfterDate.getDate()
                let inputMonth = daysAfterDate.toLocaleDateString('en-US',{month: 'short'});
                let inputYear = daysAfterDate.getFullYear()
                let dateToAssert = `${inputMonth} ${inputDate}, ${inputYear}`
                console.log('Date to assert: '+dateToAssert)
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr => {
                    if(!dateAttr.includes(inputMonth) || !dateAttr.includes(inputYear)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(numberOfDays)
                    }else{
                        cy.get('.day-cell').not('.bounding-month').contains(inputDate).click()
                    }
                })
                return dateToAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.get('input[placeholder="Form Picker"').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').then(dateInput => {
        cy.wrap(dateInput).click()
        const dateToAssert = selectDayFromCurrent(60)
        cy.wrap(dateInput).invoke('prop','value').should('contain', dateToAssert)
        })
    })

    it('Lists and Dropdowns (non-select)', () => {
        cy.visit('/')

        //cy.get('nav nb-select').click()
        
        //In cy.get method we can pass parent and child selector attributes with a space as a single argument instead of using cy.get.find
        cy.get('nav nb-select').then(dropdown =>{
            cy.wrap(dropdown).click();
            //each method is used for iterating through Cypress Chainable object array. First parameter is the object and 2nd is index
            cy.get('nb-option').each((option, index)=>{
                cy.wrap(option).click();
                cy.wrap(dropdown).find('button').should('contain', option.text().trim())
                if(index<3)
                    cy.wrap(dropdown).click();

            })
        })
        
    })

    it('Webtables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        //1. Find row by any column text and perform operations

        cy.get('table').contains('tr', 'Larry').then(larryRow => {
            cy.wrap(larryRow).find('i.nb-edit').click()
            cy.wrap(larryRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(larryRow).find('i.nb-checkmark').click()

            //Validate updated age
            cy.wrap(larryRow).find('td').eq(6).should('contain','35')

        })

        //2. Find row by index

        cy.get('table').find('thead tr').eq(1).find('.nb-plus').click()
        cy.get('table').find('thead tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').clear().type('John')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').clear().type('Smith')
            cy.wrap(tableRow).find('i.nb-checkmark').click()
        })
        cy.get('table').find('tbody tr').first().then(johnRow => {
            cy.wrap(johnRow).find('td').eq(2).should('contain', 'John')
            cy.wrap(johnRow).find('td').eq(3).should('contain', 'Smith')
        })

        //3. Get each row validation
        const validAgeInputs = [20,30,40]
        const invalidAgeInputs = [200,300,400]

        validAgeInputs.forEach(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age+'')
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age+'')
            })
        })

        invalidAgeInputs.forEach(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age+'')
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                cy.wrap(tableRow).should('contain', 'No data found')
            })
        })

    })

    it('Tooltips', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('Dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //Stub needs to be created because that way we get exception if stub.getCall() method fails if stub is not created. 
        //Thus warning us about alert not getting displayed
        let stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //To cancel the popup, return false in the on method
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
        
    })
})