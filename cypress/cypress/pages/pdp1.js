import Converter from "../utils/converter";
let converter = new Converter();

class PdpPage {
    elements = {
        qdlLabel: () => cy.get('.tablet-sticky-bottom > .variant__volume-discount > .pdp-favorite'),
        variantOption: (value) => cy.get("input[data-value='" + value + "']"),
        qdpPopup: () => cy.get("#volume-discount"),
        quantityInput: () => cy.get('#qty'),
        addToCartBtn: () => cy.get('.pdp-info__btn > .btn'),
        itemPriceInMiniCart: () => cy.get('.mini-cart__product-price--cost'),
        quantityInputInMiniCart: () => cy.get('.mini-cart__product-quantity > .input'),
        increaseQtyMiniCartBtn: () => cy.get('.mini-cart__product-quantity-plus'),
    }

    assertQdpLabelDoNotDisplay() {
        this.elements.qdlLabel()
            .should("not.visible");
    }

    assertQdpLabelDisplay() {
        this.elements.qdlLabel()
            .should("be.visible");
    }

    selectVariant(variantName) {
        this.elements.variantOption(variantName)
            .click();
    }

    clickOnQdpLabel() {
        this.elements.qdlLabel()
            .click();
    }

    setQuantity(qty) {
        this.elements.quantityInput()
            .clear()
            .type(qty)
    }

    setQuantityInMiniCart(qty) {
        cy.wait(1000)
        cy.intercept('POST', "**/DefaultCart/ChangeCartItem").as('changeCartItem')
        this.elements.quantityInputInMiniCart()
            .clear({ force: true })
            .type(qty, { force: true })
            .type("{enter}", { force: true });
        cy.wait('@changeCartItem').its('response.statusCode').should('eq', 200)
    }

    clickOnAddToCart() {
        this.elements.addToCartBtn()
            .click();
    }

    assertProductPriceEqual(expectedPrice) {
        this.elements.itemPriceInMiniCart()
            .invoke("text")
            .then(priceText => {
                let actualPrice = converter.extractAmountFromPriceString(priceText);
                expect(actualPrice).to.be.closeTo(expectedPrice, 0.001);
            })
    }

    increaseQtyInMiniCart() {
        cy.intercept('POST', "**/DefaultCart/ChangeCartItem").as('changeCartItem')
        this.elements.increaseQtyMiniCartBtn()
            .click();
        cy.wait('@changeCartItem').its('response.statusCode').should('eq', 200)
    }
}

export default PdpPage