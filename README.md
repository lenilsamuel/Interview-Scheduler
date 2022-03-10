# Interview Scheduler
Interview Scheduler is a single-page application (SPA) built with React. The app allows students to book appointments from a list of interviewers. The data persists by making requests to the scheduler-api. Both apps must run simultaneously. A link to the scheduler-api is located [here](https://github.com/lenilsamuel/scheduler-api). 

### Scope
* There are 5 appointment slots available per day
* A student can create an appointment and choose from a predetermined list of interviewers
* A student can edit an existing appointment
* A student can delete an appointment
* The app dynamically adjusts the available spots shown on the left

## Project
### Demo
!["Project Demo"](https://github.com/lenilsamuel/Interview-Scheduler/blob/master/screenshots/Scheduler.gif?raw=true)

### Create Appointment
!["Create Appointment"](https://github.com/lenilsamuel/Interview-Scheduler/blob/master/screenshots/Create-Appointment.png?raw=true)

### Delete Appointment
!["Delete Appointment"](https://github.com/lenilsamuel/Interview-Scheduler/blob/master/screenshots/Delete%20Appointment.png?raw=true)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Dependencies
* axios
* classnames
* normalize.css
* react
* react-dom
* reac-scripts