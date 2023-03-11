/// <reference types="cypress"/>

describe('Login Page Tests', () => {
    beforeEach(() => {
      // Load the login page before each test
      cy.visit('https://qa-test.dmzrwbdiwhv33.amplifyapp.com/login');
    });
  
    it('Should display all the required elements on the login page', () => {
      // Check if the page contains the required elements
      cy.get('#input-live').should('be.visible');
      cy.get(':nth-child(2) > .form-control').should('be.visible');
      cy.get('#login-btn').should('be.visible');
    });
  
    it('Should display an error message when no Email and no Password is used', () => {
      // Submit an empty form
      cy.get('#login-btn').click();
      // Check if the error message is displayed
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Please fill out this field');
      });
    });

    it('Should display an error message when no Email and a valid Password is used', () => {
        // Submit an empty email field
        cy.get(':nth-child(2) > .form-control').type('4.Success$');
        cy.get('#login-btn').click();
        // Check if the error message is displayed
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please fill out this field');
          });
    });

    it('Should display an error message when a valid Email and no Password is used', () => {
        // Submit an empty password field
        cy.get('#input-live').type('info@curacel.co');
        // Check if the error message is displayed
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please fill out this field');
          });
    });
  
    it('Should display an error message when an invalid Email and an invalid Password is used', () => {
      // Submit the form with an incorrect email and password
      cy.get('#input-live').type('bashiralatishe@gmail.com');
      cy.get(':nth-child(2) > .form-control').type('Invalid123#');
      cy.get('#login-btn').click();
      // Check if the error message is displayed
      cy.get('#swal2-content').should('contain', 'Invalid Login Credentials. Check & Try Again');
    });

    it('Should display an error message when an invalid Email and a valid Password is used', () => {
        // Submit the form with an incorrect email and password
        cy.get('#input-live').type('bashiralatishe@gmail.com');
        cy.get(':nth-child(2) > .form-control').type('4.Success$');
        cy.get('#login-btn').click();
        // Check if the error message is displayed
        cy.get('#swal2-content').should('contain', 'Invalid Login Credentials. Check & Try Again');
    });

    it('Should display an error message when a valid Email and an invalid Password is used', () => {
        // Submit the form with an incorrect email and password
        cy.get('#input-live').type('info@curacel.co');
        cy.get(':nth-child(2) > .form-control').type('Invalid123#');
        cy.get('#login-btn').click();
        // Check if the error message is displayed
        cy.get('#swal2-content').should('contain', 'Invalid Login Credentials. Check & Try Again');
    });

    it('Should redirect you to the dashboard on a successful login', () => {
        // Submit the form with a valid email and password
        cy.get('#input-live').type('info@curacel.co');
        cy.get(':nth-child(2) > .form-control').type('4.Success$');
        cy.get('#login-btn').click();
        // Check if the user is redirected to the dashboard page
        cy.url().should('include', '/dashboard');
    });

  });