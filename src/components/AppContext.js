import { createContext, useState } from "react";

const stateData = {
	cryptoQuantity: "",
	currencyQuantity: "",
	cryptoSelected: "btc",
	currencySelected: "USD",

	btcPrice: "",
	ethPrice: "",
	xrpPrice: "",
	xlmPrice: "",
	eosPrice: "",

	ethData: "",
	xrpData: "",
	xlmData: "",
	eosData: "",

	usdPrice: 1,
	plnPrice: "",
	eurPrice: "",

	currenciesData: "",
	result: "",
	cryptoQuantityInputDisabled: false,
	currencyQuantityInputDisabled: false,
};

export const GlobalState = createContext();

const AppContext = ({ children }) => {
	const [state, setState] = useState(stateData);
	return (
		<GlobalState.Provider value={[state, setState]}>
			{children}
		</GlobalState.Provider>
	);
};

export default AppContext;
