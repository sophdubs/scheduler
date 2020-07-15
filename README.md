# Interview Scheduler


Fig 1. Animated Gif of the app in action. The appointment components are conditionally rendered using a custom state machine.

![error-save](https://github.com/sophdubs/scheduler/blob/master/docs/error-save.png?raw=true)
Fig 2. An error component is displayed when the sever failed to delete or save the interview. 

## Project Description
Interview Scheduler is a React SPA that allows users to book and cancel interviews built using the latest tools and technologies. The data is persisted by the API server using a PostreSQL database. The state is managed using custom and built in hooks. The client application communicates with an API server over HTTP using axios. Jest and Cypress tests are used throughout the development of the project. 

## Project Features
- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Setup:
The Scheduler client application and the Scheduler API server application must run concurrently; requests are proxied from the Webpack development server to the API server.

1. Start by forking and cloning the scheduler-api server found [here](https://github.com/lighthouse-labs/scheduler-api)
2. Follow the steps on the README to install and setup the database
3. Fork and clone this repo
4. Navigate to the root directory and install the project dependencies on your local machine using this command 
``` 
npm install 
```
5. Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project
```
npm start
```

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, SASS, JavaScript

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server, Jest, Cypress

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
