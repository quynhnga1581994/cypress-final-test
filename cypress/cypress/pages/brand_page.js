class BrandPage {
    url = "https://prep.brownells.com/brands/";

    elements = {
        shopAllsBrandBtn: () => cy.contains("Shop All Our Brands At Once!"),
        manufacturerDetailSection: () =>
            cy.get(".manufacturer-detail__list.row"),
        letterDropdownBtn: (letter) =>
            cy
                .get(".manufacturer-detail__list.row")
                .contains(".bn-select__selected-item", letter),
        openingDropdownList: () => cy.get(".bn-select.opening"),
        manufacturerLetter: () => cy.get(".manufacturer-list__item"),
        manufacturerDetailListRow: () =>
            cy.get(".manufacturer-detail__list.row")
    };

    selectors = {
        manufacturerDetailListRowItem: ".manufacturer-detail__list--item"
    };

    visit() {
        cy.visit(this.url);
    }

    clickShopAllBrandsButton() {
        this.elements.shopAllsBrandBtn().click();
    }

    selectSpecificLetter(letter) {
        this.elements.letterDropdownBtn(letter).click();
    }

    assertDisplayManufacturerDetailSection() {
        this.elements.manufacturerDetailSection().should("be.visible");
    }

    assertDisplayDropDown() {
        this.elements.openingDropdownList().should("be.visible");
    }
    assertDisplayAllOptionWithLetter(letter) {
        this.elements
            .openingDropdownList()
            .find('div[role="option"]')
            .each((option) => {
                cy.wrap(option)
                    .invoke("text")
                    .then((text) => {
                        expect(text[0].toUpperCase()).to.equal(
                            letter.toUpperCase()
                        );
                    });
            });
    }

    clickToBrandName(brandName) {
        this.elements
            .openingDropdownList()
            .find(`div[title="${brandName}"]`)
            .click();
    }

    assertNavigateToBrandPage(brandCode) {
        cy.url().should("include", brandCode);
    }

    clickSpecificLetter(letter) {
        const lowerCaseLetter = letter.toLowerCase();
        cy.intercept(
            "GET",
            `https://prep.brownells.com/ManufacturerLandingPage/GetManufacturers?word=${lowerCaseLetter}`
        ).as("getBrandList");
        this.elements
            .manufacturerLetter()
            .find(`[title="${lowerCaseLetter}"]`)
            .click();

        cy.wait("@getBrandList").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    }

    assertDisplayManufacturerDetailList() {
        this.elements.manufacturerDetailListRow().should("be.visible");
    }

    assertAllBrandNameDisplayCorrect(letter) {
        this.elements
            .manufacturerDetailListRow()
            .find(this.selectors.manufacturerDetailListRowItem)
            .each((row) => {
                cy.wrap(row)
                    .invoke("text")
                    .then((text) => {
                        expect(text[0]).to.equal(letter);
                    });
            });
    }
}

export default BrandPage;
