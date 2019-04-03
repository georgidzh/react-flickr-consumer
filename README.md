# Flickr Now

SPA Web application built with ReactJS that consumes Flickr's photos API and allows saving posts in IndexedDB

## Installation

This guide assumes you have NodeJS and NPM installed on your machine

Clone the repository

```bash
git clone https://github.com/georgidzh/react-flickr-now.git
```

Make a copy of `.env.example` in the root folder and rename it to `.env`
replace "your-flickr-api-key" for "REACT_APP_FLICKR_API_KEY" with yours. You can get one on [Flickr](https://www.flickr.com/services/apps/create/apply)

Install the project dependencies:

```bash
cd [project_root]
```

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
* Infinite scroll of images
* Lazy loading the images in the grid to improve page load and improve UX
* A modal window with more information about the photo and full description and photo, since they are not displayed in the grid if the description is not too long or the image format doesn't fit the design
* Options for customizing the UI by changing the image format/size and hiding the information in the card
* Store photos locally in the browsers' IndexedDB NoSql database, allowing later use and not loosing the images the user liked. A Wrapper around IndexedDB based on promises is used - [Dexie](https://dexie.org/).
* One container to rule them all :) The same container is responsible and exposes the same functionalities for both the
Flickr REST Service and the local database storage
* State management with [Redux](https://facebook.github.io/create-react-app/)
* Async store actions with [Redux thunk](https://github.com/reduxjs/redux-thunk)
* Full text search (locally is limited)
* Routing with [React Router](https://reacttraining.com/react-router/)
* Linting folowing the [airbnb](https://github.com/airbnb/javascript) standard
* [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/) CSS framework.
* Polyfills for old browsers as Internet Explored, Some of the features of IndexedDB are not used because of browser support, for example the multi-entry index.
* Safe Content enabled, but unfortunately the public feed doesn't apply that filter. And on the other hand the users are not marking them as SAFE when they upload them.

... and more

## TODO:

* Improve tests as the coverage is not full at the moment
* Display loading images in the grid
* Use src-sets on images to improve UX on small screens
* Optimize performance
* Limit the rendered results, currently it keeps everything in the DOM when scrolling
* Consume more endpoints and enable more search options
* Allow export, because the stored data can be easily lost from the browser
* Improve styling
