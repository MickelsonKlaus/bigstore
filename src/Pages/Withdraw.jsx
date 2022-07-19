import CurrencyFormatter from "react-currency-formatter";
import DNav from "../Components/DNav";
import "../Styles/Dashboard.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "../Components/Input";
import { useState } from "react";
import { useStateValue } from "../StateProvider";

function Withdraw() {
	let [{ user }] = useStateValue();
	let { earning, lw } = user;
	let initial = "";
	if (earning > 500) initial = Math.floor(earning / 500);
	let banks = ["FirstBank Nigeria", "UBA", "GTB", "Union", "Zeinth"];
	let data = {
		name: "",
		acct: "",
		amount: "",
		bank: "",
	};
	let [PD, setPD] = useState({ ...data });

	let handle = (e) => {
		PD[e.target.name] = e.target.value;
		setPD({ ...PD });
	};

	let handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="wthC">
			<DNav />
			<div className="wth">
				{lw.amount > 0 && (
					<p className="lst">
						Last Withdrawal:
						<span>Date-time: 12/11/2021. 15:00 pm</span>
						<span>
							Amount: <CurrencyFormatter quantity={2000} currency={"NGN"} />
						</span>
					</p>
				)}
				{earning > 500 ? (
					<div className="wth__form">
						<h1>Request new Withdrawal</h1>
						<form action="" onSubmit={handleSubmit}>
							<Input
								id={"nme"}
								label={"Account Name"}
								type={"text"}
								name={"name"}
								placeholder={"Enter your account name"}
								handleChange={handle}
								value={PD.name}
							/>
							<Input
								id={"acct"}
								label={"Account Number"}
								type={"number"}
								name={"acct"}
								placeholder={"e.g 1000113422"}
								handleChange={handle}
								value={PD.acct}
								min={"10"}
								max={"10"}
							/>
							<label htmlFor="bank">
								Bank Name
								<Select
									id="demo-simple-select-autowidth bank"
									value={PD.bank}
									onChange={handle}
									autoWidth
									className="sf"
									name="bank"
								>
									{banks.map((_, i) => {
										return (
											<MenuItem key={i} value={_}>
												{_}
											</MenuItem>
										);
									})}
								</Select>
							</label>

							<label htmlFor="amount">
								Amount
								<Select
									id="demo-simple-select-autowidth amount"
									onChange={handle}
									autoWidth
									className="sf"
									name="amount"
									value={PD.amount}
									required={true}
								>
									{Array(initial)
										.fill()
										.map((_, i) => {
											return (
												<MenuItem key={i} value={500 * (i + 1)}>
													<CurrencyFormatter
														quantity={500 * (i + 1)}
														currency={"NGN"}
													/>
												</MenuItem>
											);
										})}
								</Select>
							</label>
							<button>Request Withdrawal</button>
						</form>
					</div>
				) : (
					<p style={{ color: "var(--primary)" }}>
						Earning is too low or you're not earning yet. Minimium withdrawal
						is&nbsp;
						<CurrencyFormatter quantity={500} currency={"NGN"} />
					</p>
				)}
			</div>
		</div>
	);
}

export default Withdraw;
