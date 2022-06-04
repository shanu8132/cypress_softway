/// <reference types="Cypress" />

describe('Price Comparision Problem Statement', function(){
    let amazon_price;
    let flipkart_price;
    
    it('Fetch Price from Flipkart', function(){
        cy.visit('https://www.flipkart.com/')
        cy.get('[title="Search for products, brands and more"]').type('iPhone 13{ENTER}')
        cy.get('._4rR01T').eq(0).invoke('text').should('include','iPhone 13')
        cy.get('._30jeq3._1_WHN1').eq(0).then(function(amount){
            flipkart_price = Number(amount.text().replace(/[^0-9\.-]+/g,""));
            cy.writeFile("cypress/fixtures/softway.json", { f_price: flipkart_price});
            cy.log(flipkart_price)
        })
    })

    it('Fetch Price from Amazon', function(){
        cy.visit('https://www.amazon.in/')
        cy.get('#twotabsearchtextbox').type('iPhone 13{ENTER}')
        cy.get('.a-size-medium').eq(1).invoke('text').should('include','iPhone 13')
        cy.get('.a-price-whole').eq(0).then(function(price){
            amazon_price = Number(price.text().replace(/[^0-9\.-]+/g,""));
            cy.log(amazon_price)      
    })
})

    it('Comparing Prices', function(){
        let f_price
        cy.readFile('cypress/fixtures/softway.json').its('f_price').then(function(fl_price){
             f_price = fl_price
             cy.log("Flipkart Price: "+f_price)
             cy.log("Amazon Price: "+amazon_price)

             if (f_price === amazon_price){
                 cy.log('Prices are Same on Amazon and Flipkart')
                 expect(f_price).to.eq(amazon_price)
             }

             else if(f_price > amazon_price){
                 cy.log("Prices are lower on Amazon.in")
                 expect(f_price).to.greaterThan(amazon_price)
             }

             else if(amazon_price > f_price){
                 cy.log("Prices are lower on Flipkart.com")
                 expect(amazon_price).to.lessThan(f_price)
             }
        })       
        
    })
})
