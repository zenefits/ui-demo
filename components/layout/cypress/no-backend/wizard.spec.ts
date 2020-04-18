describe('Wizard', () => {
  it.skip('should work with server state', () => {
    const storyUrl = '/iframe.html?selectedKind=layout|Wizard&selectedStory=server%20side%20state';
    cy.visit(storyUrl);

    cy.contains('Open the wizard').click();

    // /////////////
    // STEP 1 and save
    cy.hash().should('be.equal', '#/test/user/credentials');
    cy.contains('STEP: User credentials');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 2 and save
    cy.hash().should('be.equal', '#/test/user/address');
    cy.contains('STEP: Address');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 3 and save
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');
    // try to change hash manually to something random (not a wizard step)
    cy.contains('Wrong link').click();
    // should still be on the current step
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 4
    cy.hash().should('be.equal', '#/test/car/model');
    cy.contains('STEP: Car Model');

    // /////////////////
    // Go back to step 3
    cy.contains('Back').click();
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');

    // ////////////////
    // Go to step 4 using nav bar, and save
    cy.contains('Car Model').click();
    cy.hash().should('be.equal', '#/test/car/model');
    cy.contains('STEP: Car Model');
    cy.contains('Save and Continue').click();

    // /////////////
    // Check if redirected to final destination
    cy.hash().should('be.equal', '#/signature');
    cy.contains('/signature');

    // Open wizard and go to step 3
    cy.contains('Open the wizard').click();
    cy.contains('STEP: User credentials');
    // Click section and then step
    cy.contains('Car Info').click();
    cy.contains('Car Brand').click();
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');

    // Click back
    cy.contains('Back').click();
    cy.hash().should('be.equal', '#/test/user/address');
    cy.contains('STEP: Address');

    // Go home
    cy.contains('Home').click();
    cy.hash().should('be.equal', '#/');
  });

  it('should work with client side state and sequenceEnforced=true', () => {
    const storyUrl =
      '/iframe.html?selectedKind=layout|Wizard&selectedStory=client%20side%20state%20%28sequenceEnforced%20%3D%20false%29';
    cy.visit(storyUrl);

    cy.contains('Open client-side-only wizard').click();

    // /////////////
    // STEP 1 and save
    cy.hash().should('be.equal', '#/test/user/credentials');
    cy.contains('STEP: User credentials');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 2 and save
    cy.hash().should('be.equal', '#/test/user/address');
    cy.contains('STEP: Address');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 3 and save
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 4
    cy.hash().should('be.equal', '#/test/car/model');
    cy.contains('STEP: Car Model');

    // /////////////////
    // Go back to step 3
    cy.contains('Back').click();
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');

    // ////////////////
    // Go to step 4 using nav bar, and save
    cy.contains('Car Model').click();
    cy.hash().should('be.equal', '#/test/car/model');
    cy.contains('STEP: Car Model');
    cy.contains('Save and Continue').click();

    // /////////////
    // Check if redirected to final destination
    cy.hash().should('be.equal', '#/signature');
    cy.contains('/signature');
  });

  it('should work with syncing steps from server', () => {
    const storyUrl = '/iframe.html?selectedKind=layout|Wizard&selectedStory=sync%20steps%20from%20server';
    cy.visit(storyUrl);

    cy.contains('Open wizard (add a new family step from server)').click();

    // /////////////
    // STEP 1 and save
    cy.hash().should('be.equal', '#/test/user/credentials/1');
    cy.contains('STEP: User credentials');
    cy.get('ul').should('not.contain', 'Family');
    cy.contains('Save and Continue').click();

    cy.get('ul').should('contain', 'Family');

    // /////////////
    // NEW STEP and save
    cy.hash().should('be.equal', '#/test/user/family');
    cy.contains('STEP: Family');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 2 and save
    cy.hash().should('be.equal', '#/test/user/address');
    cy.contains('STEP: Address');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 3 and save
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');
    // try to change hash manually to something random (not a wizard step)
    cy.contains('Wrong link').click();
    // should still be on the current step
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('Save and Continue').click();

    // /////////////
    // STEP 4
    cy.hash().should('be.equal', '#/test/car/model');
    cy.contains('STEP: Car Model');

    // /////////////////
    // Go back to step 3
    cy.contains('Back').click();
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');

    // ////////////////
    // Go to the new step using nav bar, and save
    cy.contains('User Info').click();
    cy.contains('Family').click();
    cy.hash().should('be.equal', '#/test/user/family');
    cy.contains('STEP: Family');
    cy.contains('Save and Continue').click();

    // ///////////////
    // Go to the last step using nav bar
    cy.contains('Car Info').click();
    cy.contains('Car Model').click();
    cy.hash().should('be.equal', '#/test/car/model');
    cy.contains('STEP: Car Model');
    cy.contains('Save and Continue').click();

    // /////////////
    // Check if redirected to final destination
    cy.hash().should('be.equal', '#/signature');
    cy.contains('/signature');

    // Open wizard and go to step 3
    cy.contains('Open wizard (add a new family step from server)').click();
    cy.hash().should('be.equal', '#/test/user/credentials/1');
    cy.contains('STEP: User credentials');
    cy.contains('Car Info').click();
    cy.contains('Car Brand').click();
    cy.hash().should('be.equal', '#/test/car/brand');
    cy.contains('STEP: Car Brand');

    // Click back
    cy.contains('Back').click();
    cy.hash().should('be.equal', '#/test/user/address');
    cy.contains('STEP: Address');

    // Go home
    cy.contains('Home').click();
    cy.hash().should('be.equal', '#/');
  });
});
