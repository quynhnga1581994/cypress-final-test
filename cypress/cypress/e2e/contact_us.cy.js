import PageData from "../fixtures/contactus.json";
import ContactUs from "../pages/contactus";


const contactUs = new ContactUs();

beforeEach(() => {
    cy.log('====== step 1: Go to Contact Us Page');
    contactUs.visit();

    cy.log('====== step 2: Go to Contact Us successfully');
      contactUs.assertGoToContactUsPage(PageData.contactUsTitle)

})

describe('Contact Us', () => {
    it('Error message should be displayed under each required field when a user leaves all the required fields blank', () => {
      cy.log('====== step 3: Input blank all fields and click Submit button')
      contactUs.clickSubmitButton()

      cy.log('====== step 4: Show error message under First Name field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.firstNameField)

      cy.log('====== step 5: Show error message under Last Name field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.lastNameField)

      cy.log('====== step 6: Show error message under Email Address field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.emailAddressfield)

      cy.log('====== step 7: Show error message under message field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.messageField)
    })

    it('Error message should be displayed under First Name field when a user input first name is blank', () => {
      cy.log("Step 03: Input valid all fields and blank First Name field")
      contactUs.inputFormData(PageData.validDataForm,false)

      cy.log("Step 04: click Submit button")
      contactUs.clickSubmitButton()

      cy.log('====== step 3: Show error message under First Name field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.firstNameField)

    });

    it('Error message should be displayed under Last Name field when a user input last name is blank', () => {
      cy.log("Step 03: Input valid all fields and blank Last Name field")
      contactUs.inputFormData(PageData.validDataForm,true,false)

      cy.log("Step 04: click Submit button")
      contactUs.clickSubmitButton()

      cy.log('====== step 5: Show error message under Last Name field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.lastNameField)

    });

    it('Error message should be displayed under Email field when a user input email is blank', () => {
      cy.log("Step 03: Input valid all fields and blank Email field")
      contactUs.inputFormData(PageData.validDataForm, true, true, false)

      cy.log("Step 04: click Submit button")
      contactUs.clickSubmitButton()

      cy.log('====== step 5: Show error message under Email Address field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.emailAddressfield)

    });

    it.only('Error message should be displayed under Email field when a user input invalid email', () => {
      cy.log("Step 03: Input valid all fields and input invalid Email field")
      contactUs.inputFormData(PageData.invalidDataForm)

      cy.log("Step 04: click Submit button")
      contactUs.clickSubmitButton()

      cy.log('====== step 5: Show error message under Email Address field')
      contactUs.assertDisplayErrorMessageOfEmailField(PageData.contactUsForm.emailAddressfield)

    });

    it('Error message should be displayed under Message field when a user input message is blank', () => {
      cy.log("Step 03: Input valid all fields and blank Email field")
      contactUs.inputFormData(PageData.validDataForm, true, true,true, false)

      cy.log("Step 04: click Submit button")
      contactUs.clickSubmitButton()

      cy.log('====== step 5: Show error message under message field')
      contactUs.assertDisplayErrorMessage(PageData.contactUsForm.messageField)
    });

    it('User can submit successfully when user input valid data', () => {

      cy.log("Step 02: Input invalid data form element on Contact Us page => click submit button")
      contactUs.inputFormData(PageData.validDataForm)

      cy.log("Step 03: Submit form successfully, Send email for user with content correctly as configure in BE")
      contactUs.expectDataSubmitSuccess()

        cy.log('====== step : Assert submit successfully')
        contactUs.assertDisplaySuccessMessage(PageData.successfullyMessage)

        })
  })