import React, { useContext } from "react";
import { GlobalState } from "./AppContext";

const CurrencyInputs = (props) => {
	const [state, setState] = useContext(GlobalState);

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
		<div className="curriences-container-right">
			<label htmlFor="currency">
				<span>Choose currency</span>

				<select
					className="currency-select"
					name="currency"
					id="currency"
					onChange={props.handleSelect}
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
	);
};

export default CurrencyInputs;
