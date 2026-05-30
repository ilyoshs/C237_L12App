// Import required modules
const express = require('express');
// Create an Express application
const app = express();

// Serve static assets (images, custom CSS stylesheets) from public directory
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
// In-memory data for studyLogs
let studyLogs = [
    { id: 1, subjects: 'C237', duration: 90, mood: 'Tired but productive' }
];

//Define a route to render the welcome page 
app.get('/', (req, res) => {
    res.render('index');
});

// Route to retrieve and display all study logs - This is where the "Enter" button takes you
app.get('/dashboard', (req, res) => {
    //render a view called "index" and pass the variable 'studyLogs' to the view for rendering
    res.render('dashboard', { studyLogs });
});

// Add a new study log form
app.get('/studyLogs', function (req, res) {
    //render a view called "addSession"
    res.render('addSession');
});
// Add a new study log
app.post('/studyLogs', function (req, res) {
    //add a new study log
    //This line retreives the value of 'subjects', 'duration' and 'mood' sent from addSession.ejs form
    const { subjects, duration, mood } = req.body;
    // Assign a new ID to the new study log
    const id = studyLogs.length > 0 ? studyLogs[studyLogs.length - 1].id + 1 : 1; // Safer ID generation
    // Creates a new study log object with the new values
    const newStudyLog = { id, subjects, duration, mood };
    // Add the new study log to the array
    studyLogs.push(newStudyLog);
    // redirect back to index page
    res.redirect('/dashboard');
});

// Update a study log by ID - First Find the study log
app.get('/studyLogs/:id/update', function (req, res) {
    //find study log to update based on ID selected
    //capture the value specified in the URL for the id parameter and store in studyLogId variable
    const studyLogId = parseInt(req.params.id);

    //Finding a log in the 'studyLogs' array with a matching id to update
    //Study log found will be stored in updateStudyLog variable
    const updateStudyLog = studyLogs.find(function (studyLog) {
        return studyLog.id === studyLogId;
    });
    //render the view 'updateStudyLog' and pass the updateStudyLog varible to the page updateStudyLog.ejs to be displayed.
    res.render('updateStudyLog', { updateStudyLog });
});
// Update a study log by ID - Update the study log information
app.post('/studyLogs/:id/update', function (req, res) {
    // update study log information entered in updateStudyLog form
    // Parse the 'id' parameter from the request URL into an integer and store it in 'studyLogId'.
    const studyLogId = parseInt(req.params.id);

    // Destructure the 'subjects', 'duration' and 'mood' properties from the request body.
    const { subjects, duration, mood } = req.body;

    // Create an object 'updatedStudyLog' containing the parsed 'id', 'subjects', 'duration' and 'mood'.
    const updatedStudyLog = { id: studyLogId, subjects: subjects, duration: duration, mood: mood };

    // Iterate over each element in the 'studyLogs' array using the 'map' function.
    studyLogs = studyLogs.map(studyLog => {
        // Check if the 'id' of the current 'studyLog' matches the 'studyLogId' parsed from the URL.
        if (studyLog.id === studyLogId) {
            // If there's a match, return a new object combining the existing 'studyLog' properties with the updated ones.
            return { ...studyLog, subjects: subjects, duration: duration, mood: mood };
        }
        // If there's no match, return the 'studyLog' object unchanged.
        return studyLog;
    });
    // Redirect the user back to the root URL ('/') after updating the student information.
    res.redirect('/dashboard');
});

// Delete a study log by ID
app.get('/studyLogs/:id/delete', function (req, res) {
    const studyLogId = parseInt(req.params.id);

    // Filter out the deleted study log
    studyLogs = studyLogs.filter(studyLog => studyLog.id !== studyLogId);
    //Redirect back to index page after deleting the study log
    res.redirect('/dashboard');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});