// environment.php
// This endpoint can be used to create, delete, and view temperature and humidity observations.
// This is useful if you wish to create a graph that shows the observations or if you want to add an
// element to your UI that displays the last observed temperature and humidity

// Method: POST
// Required Parameters: SessionID, observationDateTime, temperature, humidity
// Expected Returns: A JSON Object with a key of Outcome

// Method: DELETE
// Required Parameters: SessionID, logID
// Expected Returns: A JSON Object with a key of Outcome

// Method: GET
// Required Parameters: SessionID, days
// Expected Returns: An array of JSON objects with all environment record details

