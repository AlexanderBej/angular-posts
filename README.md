# RindusPosts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3, and later on migrated to 14.1.2.

The purpose of this project is to partly consume fake Rest APIs, offered by https://jsonplaceholder.typicode.com/, by reading, manipulating, and storing them in the session storage. 

The dependencies used in this application are the following: 
    - Ng-bootstrap - v9.1.3 - used for creating modals and manipulating data between component and modal.
    - Angular Material - v14.1.1 - used for a better UI experience in forms, buttons, icons, fields, divider, card.
    - Ngx-pagination - v6.0.2 - used for paginating the posts from '/home' for a better UI experience.
    - Jasmine - v3.6.0 - used for reducing the number of errors and bugs by creating unit tests.
    - Sass - v1.36.0.

The application offers the following functionalities: 
    - Post - create, read, update, delete.
    - Comments for each post - create, read, update, delete.
    - User - read.
    - Post detail page - includes post comments and user details.
    - Search and sort for posts.
    - Data requested on demand (lazy fetch) - for post on edit and details pages.
    - Lazy loaded module - for add/edit post page.
    - 404 error page for handling pages not found.

## Project structure

Modules: - add-edit-post - contains the component used for adding and editing posts.
         - core - contains the models, interfaces, services, resolver and guard used in the application.
                - also contains the core components used in the app (error page, navbar, toasts).
         - home - contains the main page of the application where the posts are displayed.
                - also contains the page for viewing a post alongside its comments and the user details.
         - shared - contains pipes and components (confirm pop-up, progress spinner) reused throughout the application.



## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

[Node.js][]: Node is used to run a development web server and build the project.

The version used in the project is: v14.16.0

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

We use npm scripts and [Angular CLI][] as our build system.

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Code quality

Run `npm run lint` to lint the application via [ESLint] v8.18.0 (https://eslint.org/).

Note! The application is currently holding 25 linting warnings.

## Improvements

For a better performance and UI/UX experience the following improvements could be done: 
    - Using backend and database instead of session storage for storing data.
    - Separate environments for development and production.
    - Using bootstrap classes for easier container building.
    - Having at least 80% of code coverage by unit tests.
    - Passing data through routes.
    - Implementing register/login/logout feature, allowing roles on user, restricting the actions made on posts/comments.
    - Using Docker container on the app.
    - Implementing authGuard

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.