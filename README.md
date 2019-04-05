# Flickr Now

SPA Web application built with ReactJS that consumes Flickr's photos API and allows saving posts in IndexedDB

## Demo
<https://flickr-now-demo.firebaseapp.com>

## Installation

This guide assumes you have NodeJS and NPM installed on your machine

Clone the repository

```bash
git clone https://github.com/georgidzh/react-flickr-consumer
```

```bash
cd [project_root]
```

Make a copy of `.env.example` in the root folder and rename it to `.env`
Peplace "your-flickr-api-key" for "REACT_APP_FLICKR_API_KEY" with yours. You can get one on [Flickr](https://www.flickr.com/services/apps/create/apply)<br>

!!! Make sure you have the SKIP_PREFLIGHT_CHECK=true in your .env file. (this is required because there is some custom linting setup, I don't like the one from create react app)

Install the project dependencies:

```bash
npm install
```

### Running

Runs the app in the development mode:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser..

Run the tests in interactive watch mode:
```bash
npm test
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance:
```bash
npm build
```
The build is minified and the filenames include the hashes.<br>

The project is not ejected and uses the configuration provided by the [Create React App](https://facebook.github.io/create-react-app/) Team. <br>
If you want to eject and make additional modifications you can do so with the eject command.
```bash
npm run eject
```

All available build tasks are defined in `package.json`.

## Features

* Delivers the most recently uploaded public photos on Flickr. Allows the user to search free text or specific tags
* Built with the latest ReactJS bootstrapped with [Create React App](https://facebook.github.io/create-react-app/)
* Memoization of the photos component in the grid to prevent re-render and potential memory increases.
* Infinite scroll to load more images into the grid.
* Lazy loading the images in the grid to improve page load and improve UX
* A modal window with more information about the photo, full description and full sized photo because the full text and the full sized image are not displayed in the grid in order to follow the design.
* Options for customizing the UI by changing the image format/size and hiding the information in the card
* Store photos locally in the browsers' IndexedDB NoSql database, allowing later use and not loosing the images the user liked. A Wrapper around IndexedDB based on promises is used - [Dexie](https://dexie.org/)
* One container to rule them all :) The same container is responsible and exposes the same functionalities for both the
Flickr REST Service and the local database storage
* State management with [Redux](https://facebook.github.io/create-react-app/)
* Async store actions with [Redux thunk](https://github.com/reduxjs/redux-thunk)
* Full text search for IndexedDB (locally is limited)
* Routing with [React Router](https://reacttraining.com/react-router/)
* Following the [airbnb](https://github.com/airbnb/javascript) code style standard
* [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/) CSS framework
* Unit test with Jest and Enzyme ( not everything is covered ). PropTypes for all components
* Polyfills for old browsers as Internet Explored, Some of the features of IndexedDB are not used because of browser support, and the full text search doesn't use some of the features of the NoSQL database. For example the multi-entry index is not used and new mapping table is created.
* Safe Content enabled, but unfortunately the public feed doesn't apply that filter. And on the other hand the users are not tagging them as SAFE when they upload them

... and more

## TODO:

* Display loading images in the grid
* Don't show IndexedDB save options if it is not supported. (There already is a check and is saved in the state)
* Use src-sets on images to improve UX on small screens
* Optimize performance
* Limit the rendered results, currently it keeps everything in the DOM when scrolling
* Provide more search options
* Improve tests as the coverage is not full at the moment
* Allow export, because the stored data can be easily lost from the browser
* Consider using the router to search for tags instead the action passed from the container
* Improve styling
