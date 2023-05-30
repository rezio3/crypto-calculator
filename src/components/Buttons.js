import React, { useContext } from "react";
import { GlobalState } from "./AppContext";

const Buttons = () => {
	const [state, setState] = useContext(GlobalState);

	const handleConvertBtn = () => {
		const {
			currencySelected,
			currencyQuantity,
			cryptoSelected,
			cryptoQuantity,
		} = state;

		const multiplier = state[`${currencySelected.toLowerCase()}Price`];

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
		<div className="buttons-container">
			<button onClick={handleConvertBtn} className="convert-btn">
				Convert
			</button>
			<button onClick={clearHandler} className="clear-btn">
				Clear
			</button>
		</div>
	);
};

export default Buttons;
