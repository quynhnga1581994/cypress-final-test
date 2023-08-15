import ProductData from "../fixtures/products.json"
import PdpPage from "../pages/pdp";

let pdpPage = new PdpPage();
// comment in other place changed

describe('PDP page', () => {
  it('QDP label do not display when user still not choose variant', () => {
    // new conflict test case abc

    cy.log("visit pdp url");
    cy.visit(ProductData.productQDP.url)

    cy.log("assert qdp label do not display");
    pdpPage.assertQDPLabelDoNotDisplay();
  })
  
  it('QDP label display correctly when user choose variant', () => {
    cy.log("visit pdp url");
    cy.visit(ProductData.productQDP.url)

    cy.log("choose variant");

    for (let variant of ProductData.productQDP.variantItems) {
      pdpPage.chooseVariant(variant);
    }

    cy.log("assert qdp label display");
    pdpPage.assertQDPLabelDisplay();
  });

  it('qdp apply successfully when user checkout enough quantity', () => {
    cy.log("visit pdp url");
    cy.visit(ProductData.productQDP.url)

    cy.log("choose variant");

    for (let variant of ProductData.productQDP.variantItems) {
      pdpPage.chooseVariant(variant);
    }

    cy.log("assert qdp label display");
    pdpPage.assertQDPLabelDisplay();

    cy.log("input quantity");
    pdpPage.inputQuantity(ProductData.productQDP.quantityDiscounts[0].quantity);

    cy.log("click to add to cart button");
    pdpPage.clickOnAddToCartBtn();

    cy.log("assert item values in mini cart display correctly");
    pdpPage.assertItemPriceEqual(ProductData.productQDP.quantityDiscounts[0].totalAmount);

    cy.log("input qty in mini cart page")
    pdpPage.inputQuantityInMiniCart(ProductData.productQDP.quantityDiscounts[1].quantity);

    cy.log("assert item values in mini cart display correctly");
    pdpPage.assertItemPriceEqual(ProductData.productQDP.quantityDiscounts[1].totalAmount);

    cy.log("input more qty in mini cart page")
    pdpPage.inputQuantityInMiniCart(ProductData.productQDP.quantityDiscounts[1].quantity + 3);
    cy.log("assert item values in mini cart display correctly");
    pdpPage.assertItemPriceEqual(ProductData.productQDP.quantityDiscounts[1].totalAmount + 3 * ProductData.productQDP.quantityDiscounts[1].pricePerUnit);
  });

  it('The rest quantity charged at QDP price per unit when user checkout greater than quantity threshold', () => {
    
    cy.log("visit pdp url");
    cy.visit(ProductData.productQDP.url)

    cy.log("choose variant");

    for (let variant of ProductData.productQDP.variantItems) {
      pdpPage.chooseVariant(variant);
    }

    cy.log("assert qdp label display");
    pdpPage.assertQDPLabelDisplay();

    cy.log("input quantity");
    pdpPage.inputQuantity(ProductData.productQDP.quantityDiscounts[2].quantity);

    cy.log("click to add to cart button");
    pdpPage.clickOnAddToCartBtn();

    cy.log("assert item values in mini cart display correctly");
    pdpPage.assertItemPriceEqual(ProductData.productQDP.quantityDiscounts[2].totalAmount);

  });

})