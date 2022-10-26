import React from "react";
import AppContext from "./components/AppContext";
import Calculator from "./components/Calculator";

import "./style/css/app.css";

const App = () => {
	return (
		<div className="main-container">
			<AppContext>
				<h1 className="header">Crypto Calculator</h1>
				<Calculator />
			</AppContext>
		</div>
	);
};

export default App;
