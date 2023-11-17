describe('movie search app', () => {
beforeEach(() => {
  cy.visit('http://localhost:5173/')
});
  it('should contain form', () => {
    cy.get("form").should("exist");
    cy.get("form input#searchText").should("exist");
    cy.get("form button").contains("Sök").should("exist");
    cy.get("form button#sort").should("exist");
  })
it('should show movies', () => {
  cy.get("form input#searchText").type("star");
  cy.get("form button").contains("Sök").click();
  //searchresult är den section som kommer innehålla de divar som skapas i movieSearchApp.ts.
  //"#searchresult > div" = alla divar inuti section searchresult. 
  cy.get("#searchresult > div").should("have.length", 2);
})

it('should present a movie', () => {
  cy.intercept("https://medieinstitutet-wie-products.azurewebsites.net/api/*",
    [
      {
        name: "Vad som helst - the movie",
        imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/0c/cd/c6/0ccdc621-bd7d-16e4-ffdf-d3808436f6a6/mza_10610807914077573874.jpg/1200x1200bb.jpg"
      }
    ]);

  cy.get("form input#searchText").type("star");
  cy.get("form button").contains("Sök").click();
  cy.get("#searchresult > div").should("have.length", 1);
  cy.get('#searchresult > div > h3').contains("Vad");
  cy.get('#searchresult > div > .movie__image > img').should(
    "have.attr",
    "src",
    "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/0c/cd/c6/0ccdc621-bd7d-16e4-ffdf-d3808436f6a6/mza_10610807914077573874.jpg/1200x1200bb.jpg"
  );
})

// En egen liten övning att se allmänt att filmerna visas.
// it('should present a movie', () => {
//   cy.get("form input#searchText").type("star");
//   cy.get("form button").contains("Sök").click();
//   cy.get("#searchresult > div").should("have.length", 2);
//   cy.get('#searchresult > div > h3').should("exist");
//   cy.get('#searchresult > div > .movie__image > img').should("exist");
// })

it('should show no results when no movies', () => {
    cy.intercept("https://medieinstitutet-wie-products.azurewebsites.net/api/*", []
);
  cy.get("form input#searchText").type("star");
  cy.get("form button").contains("Sök").click();
  cy.get("#searchresult > p").contains("Inga sökresultat");
});

it('should sort movies when button is pressed', () => {
  cy.intercept("https://medieinstitutet-wie-products.azurewebsites.net/api/*",[
          {
        name: "Vad som helst - the movie",
        imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/0c/cd/c6/0ccdc621-bd7d-16e4-ffdf-d3808436f6a6/mza_10610807914077573874.jpg/1200x1200bb.jpg"
      },
      {
        name: "Agaton - an epic saga",
        imageUrl: "https://www.filminstitutet.se/globalassets/2.-fa-kunskap-om-film/ta-del-av-filmsamlingarna/affischbilder/agaton-sax-och-bykopings-gastabud_affisch.jpg"
      }
    ]);
  cy.get("form input#searchText").type("star");
  cy.get("form button").contains("Sök").click();
  cy.get("button").contains("Sortera").click();
  cy.get("#searchresult > div > h3").first().contains("Agaton");
})

});
