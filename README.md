# currency-frontend

I used currencylayer and because i was using free plan it doesn't allow me to change source of the currency so I implement a calculation for generating other currency rates.

for changing the API KEY of currencylayer use config.tsx in src folder.

## the challenge

We are a company based in Munich, Germany and are expanding internationally to the US and Switzerland. We need to price our products in CHF and USD. Our pricing team needs a dashboard that show the current value of a EUR amount in CHF and USD. Also we would like to have an overview of the last two weeks conversion rates in a graphical chart.

## the data

Please use https://currencylayer.com/ to retrieve raw currency data, and please utilize the client library provided here: (https://www.npmjs.com/package/currencylayer-client).

## requirements

- be able to convert currencies from and to the target currencies mentioned above
- be able to retrieve historical currency conversion rates
- show a chart of daily currency rates for a selected list of target currencies (multi-select)
- 'correct' handling of currency rates in Javascript

## your stack

Try to use a modern JS stack, e.g. React or Vue. You can use any boilerplate or framework you like, for React we recommend create-react-app or next.js, for Vue you could for instance use nuxt.js. If you prefer it this way, you can sprinkle your code with some typescript, but this is not a must.

## optionals

Local storage, unit tests, PWA, anything you want to show off...

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
