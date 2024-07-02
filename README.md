I created an endpoint that get the user location from the users IP address and take a querys string name and respond with the users IP address and weather in the location in an object format.
First i imported all my required modules to my index file server.js
Made a variable that and assigned my api keys to it.
Made a GET request to /api/hello
Created an asynchronous function
In my GET request i collected the the name query string and assigned it to a variable.
I collected the users IP address from the request header.
I created a variable that await the users IP address and and makes a GET request to an external API for the user location with the IP address with my api key.
I created a variable for the response from the api and store the value inside.
I created a variable that contain the Longtitude and Latitude from the location value.
I created a variable that await the longitude and the latitude from the location and use it to make a GET request to the an external API for the teamperature in the location.
I created a variable that stores the responsee from the external API.
I response with a json format using the users IP address, location and temperature in the location.
I made a try and catch error in the whole code
I made an error response in case of error.
I made a port for it to listen to.
