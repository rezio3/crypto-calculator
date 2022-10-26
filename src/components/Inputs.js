import React, { useContext, useEffect } from "react";
import { GlobalState } from "./AppContext";

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

	return (
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
	);
};

export default Inputs;
