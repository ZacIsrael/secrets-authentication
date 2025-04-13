import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// Set EJS as the templating engine
app.set("view engine", "ejs");

//TODO 1: Fill in your values for the 3 types of auth.
// In a real application, these values would NEVER be in a code
// document lol. This is just practice though so I do not care about
// them being leaked here.
const yourUsername = "testuser1804";
const yourPassword = "iLoveToCode123!";
const yourAPIKey = "66a62f37-7d0c-4904-a1f6-1d50864a8a0c";
const yourBearerToken = "Bearer ce7ef750-bda7-43e6-971c-90cef4696865";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    //TODO 2: Use axios to hit up the /random endpoint
    const response = await axios.get(`${API_URL}random`);
    //The data you get back should be sent to the ejs file as "content"
    const result = response.data;
    console.log('/noAuth: result = ', result)
    let resString = JSON.stringify(result);
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    res.render('index', {
      content : resString
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.render("index", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
