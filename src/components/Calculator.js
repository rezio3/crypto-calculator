import React, { useContext, useEffect } from "react";
import { GlobalState } from "./AppContext";
import Inputs from "./Inputs";

const Calculator = () => {
	const [state, setState] = useContext(GlobalState);

	useEffect(() => {
		Promise.all([
			// pobieranie danych o btc
			fetch("https://api.coindesk.com/v1/bpi/currentprice.json"),
			// pobieranie danych o walutach FIAT
			fetch("https://open.er-api.com/v6/latest/USD"),
			// pobieranie danych o altcoinach
			fetch("https://api.coingecko.com/api/v3/exchange_rates"),
		])
			.then(([res1, res2, res3]) =>
				Promise.all([res1.json(), res2.json(), res3.json()])
			)
			.then(([res1, res2, res3]) =>
				setState({
					...state,
					btcPrice: res1.bpi.USD.rate_float,
					currenciesData: res2,
					ethData: res3.rates.eth.value,
					xrpData: res3.rates.xrp.value,
					xlmData: res3.rates.xlm.value,
					eosData: res3.rates.eos.value,
				})
			);
	}, []);

	const handleConvertBtn = () => {
		const {
			currencySelected,
			currencyQuantity,
			cryptoSelected,
			cryptoQuantity,
		} = state._currentValue;
		console.log(cryptoSelected);

		const multiplier = state._currentValue[`${currencySelected}Price`];
		console.log(multiplier);

		if (cryptoQuantity !== "") {
			setState({
				...state._currentValue,
				result:
					(
						state._currentValue[`${cryptoSelected}Price`] *
						cryptoQuantity *
						multiplier
					).toFixed(2) + ` ${currencySelected}`,
			});
		} else if (!currencyQuantity !== "") {
			setState({
				...state._currentValue,
				result:
					(
						currencyQuantity /
						(multiplier * state._currentValue[`${cryptoSelected}Price`])
					).toFixed(8) + ` ${cryptoSelected}`,
			});
		}
	};
	const clearHandler = () => {
		setState({
			...state._currentValue,
			currencyQuantity: "",
			cryptoQuantity: "",
			currencyQuantityInputDisabled: false,
			cryptoQuantityInputDisabled: false,
			result: "",
		});
	};

	return (
		<React.Fragment>
			<div className="app-container">
				<Inputs />
				<div className="buttons-container">
					<button onClick={handleConvertBtn} className="convert-btn">
						Convert
					</button>
					<button onClick={clearHandler} className="clear-btn">
						Clear
					</button>
				</div>
				<div className="cost">
					<h3 className="btc-price">Cost: {state.result}</h3>
				</div>
			</div>
			<span>
				Prices are taken from{" "}
				<a href="https://www.coingecko.com/pl">coingecko</a> and{" "}
				<a href="https://www.coindesk.com/">coindesk</a>
			</span>
		</React.Fragment>
	);
};

export default Calculator;
