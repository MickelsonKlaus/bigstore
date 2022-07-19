import "../Styles/Dashboard.css";
import DNav from "../Components/DNav";
import CurrencyFormatter from "react-currency-formatter";
import { useStateValue } from "../StateProvider";

function Payments() {
	let [{ payments }] = useStateValue();

	return (
		<div>
			<DNav />
			<div className="pym">
				<h1>Payments</h1>
				{payments.length > 0 ? (
					<ol>
						{payments.map((_, i) => {
							return (
								<li key={i}>
									<h5>Payments from {_.items.length} items</h5>
									<ul>
										{_.items.map((n, x) => {
											return <li key={x}>{n}</li>;
										})}
									</ul>
									<span className="pdtc">
										<p>
											Total price:{" "}
											<CurrencyFormatter
												quantity={_.totalPrice}
												currency={"NGN"}
											/>
										</p>
										<p className="dt">{_.dateTime.toDate().toString()}</p>
									</span>
								</li>
							);
						})}
					</ol>
				) : (
					<p style={{ textAlign: "center" }}>No payments made yet </p>
				)}
			</div>
		</div>
	);
}

export default Payments;
