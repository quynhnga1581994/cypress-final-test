class ContactUs {
    url = "https://prep.brownells.com/contact-us/";

    elements = {
        contactUsTitle: () => cy.get(".contactus__title.h2"),
        formBody: () => cy.get(".Form__MainBody"),
        labelField: (fieldName) => cy.contains("label", fieldName),
        submitButton: () => cy.get(`button[type="submit"]`),
        firstNameField: () =>
            cy.get('.Form__MainBody input[placeholder="First Name"]'),

        lastNameField: () =>
            cy.get('.Form__MainBody input[placeholder="Last Name"]'),
        emailAddressField: () =>
            cy.get('.Form__MainBody input[placeholder="Email Address"]'),
        orderConfirmationNumberField: () =>
            cy.get(
                '.Form__MainBody input[placeholder="Order Confirmation Number"]'
            ),
        messageField: () =>
            cy.get('.Form__MainBody textarea[data-f-label="Message"]'),
        errorMessage: ".Form__Element__ValidationError"
    };

    visit() {
        cy.visit(this.url);
    }

    assertGoToContactUsPage(Title) {
        this.elements.contactUsTitle().should("contain", Title);
    }

    inputField(fieldName) {
        this.elements.labelField(fieldName).click();
    }

    clickSubmitButton() {
        this.elements.submitButton().click();
    }

    assertDisplayErrorMessage(fieldName) {
        this.elements
            .labelField(fieldName)
            .parent()
            .parent()
            .find(this.elements.errorMessage)
            .should("contain", "This field is required.");
    }

    assertDisplayErrorMessageOfEmailField(fieldName) {
        this.elements
            .labelField(fieldName)
            .parent()
            .parent()
            .find(this.elements.errorMessage)
            .should("contain", "Enter a valid email address.");
    }



    inputFormData(formData, 
        shouldEnterFirstName = true,
        shouldEnterLastName = true,
        shouldEnterEmail = true,
        shouldEnterMessage = true

        ) {
        if (shouldEnterFirstName) {
            this.elements
            .firstNameField()
            .clear()
            .type(formData.firstName);
        }

        if (shouldEnterLastName){
            this.elements
            .lastNameField()
            .clear()
            .type(formData.lastName);
        }
        
        if (shouldEnterEmail){
            this.elements
            .emailAddressField()
            .clear()
            .type(formData.emailAddress);
        }
        
        this.elements
            .orderConfirmationNumberField()
            .clear()
            .type(formData.orderConfirmationNumber);
        
        if (shouldEnterMessage){
            this.elements
            .messageField()
            .clear()
            .type(formData.message);
        }
        
    }

    expectDataSubmitSuccess() {
        cy.intercept("POST", "/EPiServer.Forms/DataSubmit/Submit").as('DataSubmit')
        this.clickSubmitButton()
        cy.wait('@DataSubmit', {log: false, timeout: 20000}).then((interception) => {
            if (!interception.response.body?.isSuccess) {
                cy.log(JSON.stringify(interception.response.body));
            }
            expect(interception.response.body.isSuccess).to.equal(true)
        })
    }

    assertDisplaySuccessMessage(successfullyMessage){
        cy.contains(successfullyMessage)
    }

}

export default ContactUs;
