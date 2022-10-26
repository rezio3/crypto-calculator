import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./components/AppContext";
import "./style/css/app.css";

const App = () => {
	const [state, setState] = useState({
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
	});

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

	const cryptoQuantityHandler = (e) => {
		let isActive;
		if (e.target.value === "") {
			isActive = false;
		} else {
			isActive = true;
		}
		setState({
			...state,
			cryptoQuantity: e.target.value,
			currencyQuantityInputDisabled: isActive,
		});
	};

	const currencyQuantityHandler = (e) => {
		let isActive;
		if (e.target.value === "") {
			isActive = false;
		} else {
			isActive = true;
		}
		setState({
			...state,
			currencyQuantity: e.target.value,
			cryptoQuantityInputDisabled: isActive,
		});
	};

	const handleConvertBtn = () => {
		const {
			currencySelected,
			currencyQuantity,
			cryptoSelected,
			cryptoQuantity,
		} = state;
		console.log(state.currencySelected);

		const multiplier = state[`${currencySelected.toLowerCase()}Price`];
		console.log(multiplier);

		if (cryptoQuantity !== "") {
			setState({
				...state,
				result:
					(
						state[`${cryptoSelected}Price`] *
						cryptoQuantity *
						multiplier
					).toFixed(2) + ` ${currencySelected}`,
			});
		} else if (!currencyQuantity !== "") {
			setState({
				...state,
				result:
					(
						currencyQuantity /
						(multiplier * state[`${cryptoSelected}Price`])
					).toFixed(8) + ` ${cryptoSelected}`,
			});
		}
	};

	const clearHandler = () => {
		setState({
			...state,
			currencyQuantity: "",
			cryptoQuantity: "",
			currencyQuantityInputDisabled: false,
			cryptoQuantityInputDisabled: false,
			result: "",
		});
	};

	return (
		<div className="main-container">
			<AppContext.Provider>
				<h1 className="header">Crypto Calculator</h1>
				<div className="app-container">
					<div className="calculator-container">
						<div className="curriences-container-left">
							<label htmlFor="crypto">
								<span>Choose crypto</span>

								<select
									className="crypto-select"
									name="crypto"
									id="crypto"
									onChange={handleSelect}
								>
									<option value="btc">BTC</option>
									<option value="eth">ETH</option>
									<option value="xrp">XRP</option>
									<option value="xlm">XLM</option>
									<option value="eos">EOS</option>
								</select>
							</label>

							<label htmlFor="howManyCrypto">
								<span>Quantity</span>
								<input
									type="number"
									className="howManyCrypto"
									name="howManyCrypto"
									id="howManyCrypto"
									value={state.cryptoQuantity}
									onChange={cryptoQuantityHandler}
									disabled={state.cryptoQuantityInputDisabled}
								></input>
							</label>
						</div>
						<div className="curriences-container-right">
							<label htmlFor="currency">
								<span>Choose currency</span>

								<select
									className="currency-select"
									name="currency"
									id="currency"
									onChange={handleSelect}
								>
									<option value="USD">USD</option>
									<option value="PLN">PLN</option>
									<option value="EUR">EUR</option>
								</select>
							</label>
							<label htmlFor="howManyCurrency">
								<span>Quantity</span>
								<input
									type="number"
									className="howManyCurrency"
									name="howManyCurrency"
									id="howManyCurrency"
									value={state.currencyQuantity}
									onChange={currencyQuantityHandler}
									disabled={state.currencyQuantityInputDisabled}
								></input>
							</label>
						</div>
					</div>
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
			</AppContext.Provider>
		</div>
	);
};

export default App;
