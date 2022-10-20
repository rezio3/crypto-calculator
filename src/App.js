import React, { Component } from "react";
import "./App.css";

class App extends Component {
	state = {
		btc: "",
		eth: "",
		ethValue: "",
	};

	componentDidMount() {
		fetch("https://api.coingecko.com/api/v3/exchange_rates")
			.then((e) => e.json())
			.then((result) => this.setState({ eth: result.rates.eth.value }));

		fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
			.then((e2) => e2.json())
			.then((result2) => this.setState({ btc: result2.bpi.USD.rate_float }));

		console.log(this.state.eth, this.state.btc);
		this.setState({
			ethValue: this.state.btc / this.state.eth,
		});
	}

	render() {
		return (
			<div>
				<h3 className="btc-price">BTC : {this.state.btc}</h3>
				<h3 className="eth-price">ETH : {this.state.ethValue}</h3>
				<h3 className="xrp-price"></h3>
				<h3 className="ltc-price"></h3>
			</div>
		);
	}
}

export default App;
