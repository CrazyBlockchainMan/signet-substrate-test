# Signet Substrate Frontend Test

- Allow user to connect their substrate wallet (e.g. Talisman, PolkadotJS extension, etc)
- Display a list of connected addresses and allow user to select an address to be used
- Have a button that allows user to create a pure proxy account using the proxy pallet’s `createPure` extrinsic, and display all created pure proxy accounts in the UI <br/>
  You may store the created pure accounts in-memory and assume user only needs it within the same session, no need to persist the data
- Display balance of each created pure account using the system pallet

## Implemented Features

- Allow user to connect to substrate wallet (Talisman for now, There is configuration)
- Get Accounts list from the Tailsman wallet
- Account selection via select option
- Create Pure Proxy account from the selected account
- Get Balance of the selected account (Free balance and Reserve balance)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Future Improvements

- Exception handling part is not done
- Defining Interfaces and Types are not fully recovered
- Frontend UI/UX is not good for now. Just implemented basic UI with TailwindCSS
- Polkadot.js documentation was not enough to understand the function correctly especially in types