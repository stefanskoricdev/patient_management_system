# Patient Management System

## Table of contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)
- [Motivation](#motivation)

## General Info

This is a clinical and practice management system for healthcare establishments, which helps user to manage patient records, treatments, scheduling and complete care.<br> It is fully dynamic web app which allows user to create custom health care professional profile and schedule. It allows you to create patient profile with basic info and professional examination.<br> User can also use centralized dashboard to gain visibility into key performance indicator as well as patient listing and important notes made by users. User can utilize this app using multiple devices like mobile, tablet, laptop or desktops.

[LINK TO DEMO](https://dmf-app-c1b0f.web.app/login)

Credentials:

- Email: admin@admin.com
- Password: admin123

## Technologies

Project is created with:

- React JS(Context API and props used to manage data flow, React router used for routing)
- Firebase(Firestore, Firebase Auth, Firebase Storage)
- Scss
- Data visualisation with ChartJS

## Features

- Log in
- Admin mode:
  - Add user,
  - Add physiotherapist and determine its working hours and days which leads to automatically creating schedule for that physio,
  - Edit physios basic info, working days and hours,
  - Delete physiotherapist.
- Regular user:
  - Add patient with all the basic info and appointment which then puts that patient into schedule,
  - Edit patient,
  - Delete patient,
  - Review each patient,
  - Edit your own profile info(Basic info, profile picture, email, password).
  - Create notes which are viewable to other users.

## Setup

To run this project:

- Clone repo:

```
$ git clone https://github.com/stefanskoricdev/patient-management-system.git
```

- Switch to directory:

```
$ cd patient-management-system
```

- Add .env file into root folder with this content:
  - **NOTE** Use your own firebase project credentials because these are not valid!

```
REACT_APP_API_KEY=AIzaUyAgHJLRVias88srXfCOC7Lgg60HtFNI6wQ
REACT_APP_AUTH_DOMAIN=patient-management-d003a.firebaseapp.com
REACT_APP_PROJECT_ID=patient-management-d003a
REACT_APP_STORAGE_BUCKET=patient-management-d003a.appspot.com
REACT_APP_MESSAGING_SENDER_ID=1016505628315
REACT_APP_APP_ID=1:1016503339315:web:0c81218c2f8b925f22f67e
```

- Setup Firebase:

  - Authentication:
    - Set Sign In method to email/password,
    - Create user with email and password (e.g. email:admin@admin.com, password: admin123)
  - Firestore Database: Create collection called "users" and in that collection create doc with random id and add fields:
    ```
    email: admin@admin.com
    firstName: Admin
    lastName: Admin
    id: random id that u got when creating doc inside users collection
    isAdmin: true (has to be boolean)
    profileImgUrl: "" (or can be some specific url)
    ```
    **Note: All field values should be strings except isAdmin filed which has to be boolean.**
    **Example:** ![firebaseExample](https://user-images.githubusercontent.com/68769671/146423503-5daa46c2-1bdd-4930-8756-7870d23d0f54.jpg)

- Install it locally using npm:

```
$ npm install
$ npm start
```

## Motivation

I decided to create this app to make it easy for my friend to manage his physiotherapy practice.
