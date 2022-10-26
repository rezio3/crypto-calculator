import React, { useContext } from "react";
import { GlobalState } from "./AppContext";

const CryptoInputs = (props) => {
	const [state, setState] = useContext(GlobalState);

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

	return (
		<div className="curriences-container-left">
			<label htmlFor="crypto">
				<span>Choose crypto</span>

				<select
					className="crypto-select"
					name="crypto"
					id="crypto"
					onChange={props.handleSelect}
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
	);
};

export default CryptoInputs;
