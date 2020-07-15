# Interview Scheduler


Fig 1. Animated Gif of the app in action. The appointment components are conditionally rendered using a custom state machine.

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

## Project Stack
Front-End:
  - React
  - Axios
  - JSX
  - HTML
  - SASS

Back-End: 
  - Express
  - Node.js
  - PostgreSQL

Testing: 
  - Storybook
  - Webpack Dev Server
  - Jest
  - Cypress

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

