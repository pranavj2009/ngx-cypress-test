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

export class DatePickerPage{
    enterCommonDatePickerDateDaysAfterTodaysDate(numberOfDays){
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.get('input[placeholder="Form Picker"').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').then(dateInput => {
        cy.wrap(dateInput).click()
        const dateToAssert = selectDayFromCurrent(numberOfDays)
        cy.wrap(dateInput).invoke('prop','value').should('contain', dateToAssert)
        })
    }

}

export const onDatePickerPage = new DatePickerPage()