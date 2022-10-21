import React, { Component } from "react";
import "./style/css/app.css";

class App extends Component {
	state = {
		cryptoQuantity: "",
		currencyQuantity: "",
		cryptoQuantityInputDisabled: false,
		currencyQuantityInputDisabled: false,
		btcData: "",
		ethData: "",
		btcPrice: "",
		ethPrice: "",
		usdPrice: 1,
		curriencesPrices: "",

		result: "",
	};

	componentDidMount() {
		// pobieranie danych o btc
		fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
			.then((e) => e.json())
			.then((result) => this.setState({ btcData: result.bpi.USD.rate_float }));

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
			.then((result) => this.setState({ ethData: result.rates.eth.value }));
	}

	handleSelect = () => {
		const selectCrypto = document.getElementsByClassName("crypto-select");
		const selectFiat = document.getElementsByClassName("currency-select");

		console.log(selectCrypto[0].value);
		console.log(selectFiat[0].value);
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
		if (this.state.cryptoQuantity !== "") {
			this.setState({
				result: this.state.btcData * this.state.cryptoQuantity + " $",
			});
		} else if (!this.state.currencyQuantity !== "") {
			this.setState({
				result: this.state.currencyQuantity / this.state.btcData + " $",
			});
		}

		this.setState({
			ethPrice: this.state.btcData / this.state.ethData,
		});
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
								<option value="ada">ADA</option>
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
