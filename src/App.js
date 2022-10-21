import React, { Component } from "react";
import "./style/css/app.css";

class App extends Component {
	state = {
		cryptoQuantity: "",
		currencyQuantity: "",
		cryptoSelected: "btc",
		currencySelected: "USD",

		btcData: "",
		ethData: "",

		btcPrice: "",
		ethPrice: "",
		xrpPrice: "",
		xlmPrice: "",
		eosPrice: "",

		usdPrice: 1,

		curriencesPrices: "",
		result: "",
		cryptoQuantityInputDisabled: false,
		currencyQuantityInputDisabled: false,
	};

	componentDidMount() {
		// pobieranie danych o btc
		fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
			.then((e) => e.json())
			.then((result) =>
				this.setState({
					btcData: result.bpi.USD.rate_float,
					btcPrice: this.state.btcData,
				})
			);

		// pobieranie danych o walutach FIAT
		fetch("https://open.er-api.com/v6/latest/USD")
			.then((e) => e.json())
			.then((result) =>
				this.setState({
					curriencesPrices: result,
				})
			);

		// pobieranie danych o eth
		fetch("https://api.coingecko.com/api/v3/exchange_rates")
			.then((e) => e.json())
			.then((result) =>
				this.setState({
					ethData: result.rates.eth.value,
					xrpData: result.rates.xrp.value,
					xlmData: result.rates.xlm.value,
					eosData: result.rates.eos.value,
				})
			);
	}

	handleSelect = () => {
		const selectCrypto = document.getElementsByClassName("crypto-select");
		const selectFiat = document.getElementsByClassName("currency-select");
		this.setState({
			cryptoSelected: selectCrypto[0].value,
			currencySelected: selectFiat[0].value,
			ethPrice: this.state.btcData / this.state.ethData,
			xrpPrice: this.state.btcData / this.state.xrpData,
			xlmPrice: this.state.btcData / this.state.xlmData,
			eosPrice: this.state.btcData / this.state.eosData,
		});
	};

	cryptoQuantityHandler = (e) => {
		if (e.target.value === "") {
			this.setState({
				currencyQuantityInputDisabled: false,
			});
		} else {
			this.setState({
				currencyQuantityInputDisabled: true,
			});
		}
		this.setState({
			cryptoQuantity: e.target.value,
		});
	};

	currencyQuantityHandler = (e) => {
		if (e.target.value === "") {
			this.setState({
				cryptoQuantityInputDisabled: false,
			});
		} else {
			this.setState({
				cryptoQuantityInputDisabled: true,
			});
		}
		this.setState({
			currencyQuantity: e.target.value,
		});
	};

	handleConvertBtn = () => {
		this.setState({});

		if (this.state.cryptoQuantity !== "") {
			this.setState({
				result:
					this.state[`${this.state.cryptoSelected}Price`] *
						this.state.cryptoQuantity +
					" $",
			});
		} else if (!this.state.currencyQuantity !== "") {
			this.setState({
				result: this.state.currencyQuantity / this.state.btcPrice + " BTC",
			});
		}
	};

	render() {
		return (
			<div className="app-container">
				<div className="calculator-container">
					<div className="curriences-container-left">
						<label htmlFor="crypto">
							<span>Choose crypto</span>

							<select
								className="crypto-select"
								name="crypto"
								id="crypto"
								onChange={this.handleSelect}
							>
								<option value="btc">BTC</option>
								<option value="eth">ETH</option>
								<option value="xrp">XRP</option>
								<option value="xlm">XLM</option>
								<option value="eos">EOS</option>
							</select>
						</label>
						<label htmlFor="currency">
							<span>Choose curriency</span>

							<select
								className="currency-select"
								name="currency"
								id="currency"
								onChange={this.handleSelect}
							>
								<option value="USD">USD</option>
								<option value="PLN">PLN</option>
								<option value="EUR">EUR</option>
							</select>
						</label>
					</div>
					<div className="curriences-container-right">
						<label htmlFor="howManyCrypto">
							<span>Quantity</span>
							<input
								type="number"
								className="howManyCrypto"
								name="howManyCrypto"
								id="howManyCrypto"
								value={this.state.cryptoQuantity}
								onChange={this.cryptoQuantityHandler}
								disabled={this.state.cryptoQuantityInputDisabled}
							></input>
						</label>
						<label htmlFor="howManyCurrency">
							<span>Quantity</span>
							<input
								type="number"
								className="howManyCurrency"
								name="howManyCurrency"
								id="howManyCurrency"
								value={this.state.currencyQuantity}
								onChange={this.currencyQuantityHandler}
								disabled={this.state.currencyQuantityInputDisabled}
							></input>
						</label>
					</div>
				</div>
				<button onClick={this.handleConvertBtn}>Convert</button>
				<div className="cost">
					<h3 className="btc-price">Cost: {this.state.result}</h3>
				</div>
			</div>
		);
	}
}

export default App;
