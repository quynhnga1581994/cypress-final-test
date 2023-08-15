import BrandPage from "../pages/brand_page";
import BrandListingPage from "../pages/brand_listing_page";
import PLPPage from "../pages/plp_page";

const brandPage = new BrandPage();
const brandListingPage = new BrandListingPage();
const plpPage = new PLPPage();

beforeEach(() => {
    cy.log('====== step 1: Go to Brand Page')
        brandPage.visit()
})

describe('Brand Page', () => {
    it('User will redirect to branding listing page when click on [Shop All Our Brands At Once!] ', () =>{
        
        brandPage.assertDisplayManufacturerDetailSection()
        cy.log('====== step 2: Click to [Shop All Our Brands At Once!] button')
        brandPage.clickShopAllBrandsButton()
        
        cy.log('====== step 3: Assert Navigate to Brand Listing Page')
        brandListingPage.assertCurrentUrl()
    })

    it('Brand display correctly when user choose specific letter  ', () => {
        let letter = "B"
        cy.log('====== step 2: Select specific letter')
        brandPage.selectSpecificLetter(letter)

        cy.log('====== step 2: Assert dropdown is shown')
        brandPage.assertDisplayDropDown()

        cy.log('====== step 3: Assert that all options start with the letter')
        brandPage.assertDisplayAllOptionWithLetter(letter)
    });

    it('User will redirect to brand page when click on specific brand ', () => {
        // fixtures
        let letter = "B"
        let brandName = "BROWNELLS"
        let urlBrandCode = "https://prep.brownells.com/brands/brownells2/"
        cy.log('====== step 2: Select specific letter')
        brandPage.selectSpecificLetter(letter)

        cy.log('====== step 2: Assert dropdown is shown')
        brandPage.assertDisplayDropDown()

        cy.log('====== step 3: Select a brand name')
        brandPage.clickToBrandName(brandName)

        cy.log('====== step 4: Assert redirect to brand page')
        brandPage.assertNavigateToBrandPage(urlBrandCode)

        cy.log('====== step 5: Assert that all products listed on the brand page correspond to the respective brand name')
        plpPage.assertDisplayAllProductWithBrand(brandName)
    });

    it('All brand display correctly when user click on [VIEW ALL BRANDS]', () => {
        
        cy.log('====== step 2: Click specific letter')
        brandPage.clickSpecificLetter("B")
        cy.log('====== step 3: Assert all brand name listed on the brand page')
        brandPage.assertDisplayManufacturerDetailList()
        cy.log('====== step 4: Assert that all options start with the letter')
        brandPage.assertAllBrandNameDisplayCorrect("B") // naming
    });


});
