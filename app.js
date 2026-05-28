// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static assets (images, custom CSS stylesheets) from public directory
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
let studyLogs = [];

// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the welcome page 
app.get('/', (req, res) => {
    res.render('welcome');
});

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

//Main Dashboard Route - This is where the "Enter" button takes you
app.get('/dashboard', (req, res) => {
    // We send the user to index.ejs AND give the page access to our studyLogs array
    res.render('index', { logs: studyLogs });
});
// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});