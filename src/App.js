import React, { Component } from "react";
import "./style/css/app.css";

class App extends Component {
	state = {
		cryptoQuantity: "",
		currencyQuantity: "",
		btc: "",
		ethData: "",
		eth: "",
	};

	handleSelect = () => {
		const selectCrypto = document.getElementsByClassName("crypto-select");
		const selectFiat = document.getElementsByClassName("curr-select");
		fetch("https://api.coingecko.com/api/v3/exchange_rates")
			.then((e) => e.json())
			.then((result) => this.setState({ ethData: result.rates.eth.value }));

		fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
			.then((e) => e.json())
			.then((result) => this.setState({ btc: result.bpi.USD.rate_float }));

		fetch("https://open.er-api.com/v6/latest/USD")
			.then((e) => e.json())
			.then((result) => console.log(result));

		// console.log(this.state.eth, this.state.btc);
	};

	cryptoQuantityHandler = (e) => {
		this.setState({
			cryptoQuantity: e.target.value,
		});
	};

	handleConvertBtn = () => {
		this.setState({
			eth: this.state.btc / this.state.ethData,
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
								<option value="BTC">BTC</option>
								<option value="ETH">ETH</option>
								<option value="XRP">XRP</option>
								<option value="ADA">ADA</option>
								<option value="EOS">EOS</option>
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
								<option value="BTC">PLN</option>
								<option value="ETH">USD</option>
								<option value="XRP">EUR</option>
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
							></input>
						</label>
						<label htmlFor="howManyCurrency">
							<span>Quantity</span>
							<input
								type="text"
								className="howManyCurrency"
								name="howManyCurrency"
								id="howManyCurrency"
							></input>
						</label>
					</div>
				</div>
				<button onClick={this.handleConvertBtn}>Convert</button>
				<div className="cost">
					<h3 className="btc-price">Cost: {this.state.btc}</h3>
				</div>
			</div>
		);
	}
}

export default App;
