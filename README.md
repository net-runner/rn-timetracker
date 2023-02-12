# Launches history browser

This is a basic launches history browser. Your task is to get the data from the GraphQL API and display it on the screen.
Cover the features and requirements.

If there is anything unclear, reach out to us through email.

### Screenshots

| MainScreen.tsx | DetailsScreen.tsx |
|:-------------------------:|:-------------------------:|
|<img src="https://user-images.githubusercontent.com/40372583/218203090-c32c8d16-8bf0-446f-82ee-e38472137a1e.png" width="200"/>|<img src="https://user-images.githubusercontent.com/40372583/218203160-781a3cc8-066c-4cdd-a118-7ef659794f3f.png" width="200"/>

| Load more launches | Filter launches by name |
|:-------------------------:|:-------------------------:|
|<img src="https://user-images.githubusercontent.com/40372583/218203108-2079d805-6521-4f4a-a0d6-d050706411f1.png" width="200"/>|<img src="https://user-images.githubusercontent.com/40372583/218203123-ccb23e01-b8ee-4199-a207-a24a89e322cf.png" width="200"/>

| Loading | Error handling |
|:-------------------------:|:-------------------------:|
|<img src="https://user-images.githubusercontent.com/40372583/218203134-5b3bbfcf-7d9b-4bbd-9612-5d187e73c228.png" width="200"/>|<img src="https://user-images.githubusercontent.com/40372583/218203148-1950ac89-5d04-40c8-b64e-1d0dcfc1af36.png" width="200"/>




## Features
- [ ] As a user I want to see the list of 20 oldest launches from launchesPast collection from https://spacex-production.up.railway.app/
- [ ] As a user I want to see the "Loading..." when the list is loading
- [ ] As a user I want to see the "Something went wrong" when there is an error with API connection
- [ ] As a user I want to see details of each Launch:
    - mission name
    - launch date
    - rocket name
- [ ] As a user I want to load 20 more launches on button click
- [ ] As a user I want to be able to find launch (filter the list) by mission name
- [ ] As a user I want to see "No results" message when there are no results of search by mission name
- [ ] As a user I want to see Rocket name displayed in gray font color if Rocket is not active
- [ ] As a user I want to see more info about launch on a separate screen:
    - details
    - links
- [ ] As a user I want to click "Retry" button when fetching the data has failed

## Requirements
- [ ] Cover the code with tests.

## Additional information
- Styling is up to you. Simple, elegant design.
- Feel free to add any package/dependency you want to use (eg. UI Kit) but please keep the solution small, clean and neat.

## API endpoints
- Get the data from https://spacex-production.up.railway.app/
- It's GraphQL API

## FAQ
- What's the deadline
> There is no fixed deadline as we prefer you to focus on quality of your solution. You can let us know when you can start working and send regular
updates about ongoing progress or any delays.
- Is TypeScript must have?
> If you don't know TypeScript feel free to switch to regular JS.
- Do I have to write tests?
> We write tests on a daily basis and we have high ( > 80% ) test coverage of our codebase. That's why tests are important for us.
> However if you don't have any experience with tests and don't want to try to write some basic tests you can still send us your
> solution and it will be evaluated normally.
## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the webserver

### `npm run android`

Starts app on Android device/simulator

### `npm run ios`

Starts app on iOS device/simulator

### `npm test`

Runs tests
