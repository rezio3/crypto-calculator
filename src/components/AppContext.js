import { createContext } from "react";

export const defaultObject = {
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

export const AppContext = createContext(defaultObject);
