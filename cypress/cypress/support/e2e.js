// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
    const urlsToForceNetworkError = [
        'https://dc.services.visualstudio.com/**',
        'https://cdn.cookielaw.org/**',
        'https://www.googletagmanager.com/**',
        'https://cdn.listrakbi.com/**',
        'https://surveys-static.survicate.com/**'
    ]
    urlsToForceNetworkError.forEach((url) => {
        cy.intercept(url, { forceNetworkError: true })
    })
})