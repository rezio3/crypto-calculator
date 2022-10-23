import React, { Component } from "react";
import "./style/css/app.css";

class App extends Component {
	state = {
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

	componentDidMount() {
		// pobieranie danych o btc
		fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
			.then((e) => e.json())
			.then((result) =>
				this.setState({
					btcPrice: result.bpi.USD.rate_float,
				})
			);

		// pobieranie danych o walutach FIAT
		fetch("https://open.er-api.com/v6/latest/USD")
			.then((e) => e.json())
			.then((result) =>
				this.setState({
					currenciesData: result,
				})
			);

		// pobieranie danych o altcoinach
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
		const { btcPrice, ethData, xrpData, xlmData, eosData } = this.state;

		this.setState({
			cryptoSelected: selectCrypto[0].value,
			currencySelected: selectFiat[0].value,

			ethPrice: btcPrice / ethData,
			xrpPrice: btcPrice / xrpData,
			xlmPrice: btcPrice / xlmData,
			eosPrice: btcPrice / eosData,

			plnPrice: this.state.currenciesData.rates.PLN,
			eurPrice: this.state.currenciesData.rates.EUR,
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
		const {
			currencySelected,
			currencyQuantity,
			cryptoSelected,
			cryptoQuantity,
		} = this.state;

		const multiplier = this.state[`${currencySelected.toLowerCase()}Price`];
		console.log(multiplier);

		if (cryptoQuantity !== "") {
			this.setState({
				result:
					(
						this.state[`${cryptoSelected}Price`] *
						cryptoQuantity *
						multiplier
					).toFixed(2) + ` ${currencySelected}`,
			});
		} else if (!currencyQuantity !== "") {
			this.setState({
				result:
					(
						currencyQuantity /
						(multiplier * this.state[`${cryptoSelected}Price`])
					).toFixed(8) + ` ${cryptoSelected}`,
			});
		}
	};

	clearHandler = () => {
		this.setState({
			currencyQuantity: "",
			cryptoQuantity: "",
			currencyQuantityInputDisabled: false,
			cryptoQuantityInputDisabled: false,
			result: "",
		});
	};

	render() {
		return (
			<div className="main-container">
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
									onChange={this.handleSelect}
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
									value={this.state.cryptoQuantity}
									onChange={this.cryptoQuantityHandler}
									disabled={this.state.cryptoQuantityInputDisabled}
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
									onChange={this.handleSelect}
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
									value={this.state.currencyQuantity}
									onChange={this.currencyQuantityHandler}
									disabled={this.state.currencyQuantityInputDisabled}
								></input>
							</label>
						</div>
					</div>
					<div className="buttons-container">
						<button onClick={this.handleConvertBtn} className="convert-btn">
							Convert
						</button>
						<button onClick={this.clearHandler} className="clear-btn">
							Clear
						</button>
					</div>
					<div className="cost">
						<h3 className="btc-price">Cost: {this.state.result}</h3>
					</div>
				</div>
				<span>
					Prices are taken from{" "}
					<a href="https://www.coingecko.com/pl">coingeco</a> and{" "}
					<a href="https://www.coindesk.com/">coindesk</a>
				</span>
			</div>
		);
	}
}

export default App;
