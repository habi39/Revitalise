##Revitalise

This project is built entirely on expo.
With a React-Native framework and the use of typescript language for front end development, we created a mobile application that uses Firebase for the backend to store user's data.


## Installation

Before running this application, ensure that the following dependencies are downloaded
```
npm install -g yarn
yarn add expo
yarn install react
yarn install react-native
```
The other dependencies to be downloaded can be seen in package.json file

## Usage
To run the programme, just run 

```
expo start
```
## What's included


#### Navigation
At the default, the main use of navigation is stack. We first see it in the AuthStack which will listen to users authentication changes, and the AppStack, which will validate if the user is a Coach or a Player and bring them to their respective dashboards. If the user is a Coach, the user will be brought to Homescreen. If the user is a Player, the user will be brought to the PlayerScreen. Subsequent movement to the different screens will only be trigger by buttons, which will navigate users through the stacks.

#### Authentication
For authentication, we heavily relied on firebase authentication services. We first configure our routes to listen to any authentication changes so that it would be able to react and toggle between the login screen and the main dashboard. We subsequently start to build out the login page allowing users to sign up, using the firebase authentication. This would then allow users to create an account and also trigger a change in authentication, which would allow users to move into the dashboard. This similarly applies for logout which will again trigger a change in the firebase authentication, however this time return null since the user will be logged out. This will then trigger routes to bring the user back to the login screen.

## Data storage
Users data is mainly retrieved upon logging in, which would populate our local Asyncstorage. The pages would then store these data with local data structures, mainly arrays, to keep track and display this data. Any changes in the backend would reflect an immediate change in the frontend upon refresh.
Respective data for each subsequent page would also only be queried when headed into respective pages.

