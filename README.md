# AppointmentManager

Installation and Setup Instructions:
--Installing the web-app:

    Before installing the web-app:
        Please make sure you have installed node and npm in your system. You can check your node version and npm version by using the following command:
        node --version and npm --version
        Install Angular CLI if not already in your system using: npm install -g @angular/cli. To check the Angular CLI version, run the command: ng version

    Installing the web-app using the ZIP file:
    1. Visit the
    1. Download the project ZIP file from the Github Repository
    2. Unzip the folder and place the folder on your desktop.
    3.  Open a new command prompt on your computer and navigate to the Appointment-Manager directory where you have saved it on your desktop.
    4. Run the command "npm install" to install all packages and dependencies for the web-app. If you encounter any vulnerability reports, fix them with: "npm audit fix"
    The web-app should be sucessfully installed on your desktop.

--Setting up the MongoDB database:

    Visit the MongoDB website and create an account. Once signed-up and logged-in, use the navigation panel to navigate to "Database" under the "Deployment" heading.
    Once there, click on the button labeled "Create". The Database creation panel will be displayed and you will have three different tiers of servers to choose from.
    I recommend setting up a "Shared" database as it is free and you can always upgrade later should your require it. Select the region and click "Create Cluster".

    Navigate to "Network Access" under "Security". Click "ADD IP ADDRESS", add your IP address and click Confirm.
    Navigate to "Database Access" under "Security". Click "ADD NEW DATABASE USER", use the password Authentication method, name the user "admin" and generate a password(Save your password somewhere seure, this will be used later). Select the role "Read and write to any database" for the user.

    Navigate back to "Database" under "Deployment". Once there, click the Connect button ans select Drivers as the connection method.
    Scroll down and copy the connection string.

    In the Appointment-Manager source-code, navigate to the Appointment-Manager\backend\app.js file and replace the values for var conString and const password with the connection string and password from your respective MongoDB cluster.

    You have now successfully set up your database.

Run Information:
--Running the web-application:

    1. Open a new command prompt on your computer and navigate to the Appointment-Manager directory where you have saved it on your computer.
    2. Use the command "node server.js" to start the node-backend-server, and wait until BOTH messages "Listening on port 3000" and "Connected to database" have been received.
    2. Create a new command prompt following step 1.
    5. Run the command "ng serve" to start the angular-frontend-server and wait for the server run confirmation message.
    8. Open your browser, navigate to "http://localhost:4200/" and the web-app will be displayed.

Extra information:
--Creating an account for new users:

    Navigate to the
    If you want to create an account for a vendor, use one the following emails ('johndeere@gmail.com','stevejobs@gmail.com').
    When creating a client user account don't use one of the emails mentioned above as that will result in a vendor account.

------ End of file ------
