# Patient Management System

## Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Motivation](#motivation)

## General Info
Patient management CRUD app created with ReactJS and Firebase.

## Technologies
Project is created with:
* React JS(Context API and props used to manage data flow, React router used for routing)
* Firebase(Firestore, Firebase Auth, Firebase Storage)
* Scss
* Data visualisation with ChartJS

## Features
* Log in
* Admin mode:
  * Add user,
  * Add physiotherapist and determine its working hours and days which leads to automatically creating schedule for that physio,
  * Edit physios basic info, working days and hours,
  * Delete physiotherapist.
* Regular user:
  * Add patient with all the basic info and appointment which then puts that patient into schedule,
  * Edit patient,
  * Delete patient,
  * Review each patient,
  * Edit your own profile info(Basic info, profile picture, email, password).
  * Create notes which are viewable to other users.
  
## Setup
To run this project:
* Clone repo:
```
$ git clone https://github.com/stefanskoricdev/patient-management-system.git
```
* Switch to directory:
```
$ cd patient-management-system
```

* Add .env file into root folder with this content:
  * **NOTE** Use your own firebase project credentials because these are not valid! 

```
REACT_APP_API_KEY=AIzaUyAgHJLRVias88srXfCOC7Lgg60HtFNI6wQ
REACT_APP_AUTH_DOMAIN=patient-management-d003a.firebaseapp.com
REACT_APP_PROJECT_ID=patient-management-d003a
REACT_APP_STORAGE_BUCKET=patient-management-d003a.appspot.com
REACT_APP_MESSAGING_SENDER_ID=1016505628315
REACT_APP_APP_ID=1:1016503339315:web:0c81218c2f8b925f22f67e
REACT_APP_ADMIN_ID=QCW05sjYhPIBX0Aovjy4jctVeA2
```
* Install it locally using npm:
```
$ npm install
$ npm start
```

## Motivation
I decided to create this app to make it easy for my friend to manage his physiotherapy practice.

[LINK](https://dmf-patient-management-d003a.web.app/)
