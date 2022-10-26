import React, { useContext } from "react";
import { GlobalState } from "./AppContext";
import CryptoInputs from "./CryptoInputs";
import CurrencyInputs from "./CurrencyInputs";

const Inputs = () => {
	const [state, setState] = useContext(GlobalState);

	const handleSelect = () => {
		const selectCrypto = document.getElementsByClassName("crypto-select");
		const selectFiat = document.getElementsByClassName("currency-select");
		const { btcPrice, ethData, xrpData, xlmData, eosData } = state;

		setState({
			...state,
			cryptoSelected: selectCrypto[0].value,
			currencySelected: selectFiat[0].value,

			ethPrice: btcPrice / ethData,
			xrpPrice: btcPrice / xrpData,
			xlmPrice: btcPrice / xlmData,
			eosPrice: btcPrice / eosData,

			plnPrice: state.currenciesData.rates.PLN,
			eurPrice: state.currenciesData.rates.EUR,
		});
	};

	return (
		<div className="calculator-container">
			<CryptoInputs handleSelect={handleSelect} />
			<CurrencyInputs handleSelect={handleSelect} />
		</div>
	);
};

export default Inputs;
