/* 
This function is a common action, which checks if the required parent-menu is open first. If its already open, it won't click on it,
Other wise it will click on it to expand the menu. This is being checked with the help of a attribute value.
*/

function selectGroupMenuItem(item){
    cy.get('nb-menu').find('[title="'+item+'"] .expand-state').then(formsMenu => {
        cy.wrap(formsMenu).invoke('attr', 'ng-reflect-icon').then(reflectIcon => {
            if(reflectIcon.includes('chevron-left')){
                cy.wrap(formsMenu).click();
            }
        })
    })
}

export class NavigationPage{
    formLayoutsPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click();
    }

    datePickerPage(){
        selectGroupMenuItem('Forms')
        cy.contains('Datepicker').click()
    }

    toastrPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    toolTipPage(){
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

//This object itself is being used in main test classes to use the functions inside.
export const navigateTo = new NavigationPage();