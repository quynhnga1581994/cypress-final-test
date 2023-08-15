class BrandListingPage {
    url = "https://prep.brownells.com/brand-listing-page/"

    elements =
    {

    };

    selectors = {

    };
    assertCurrentUrl(url){
        cy.url().should('eq', this.url);
    }
    
}

export default BrandListingPage