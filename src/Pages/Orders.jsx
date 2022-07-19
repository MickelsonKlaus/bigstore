import DNav from "../Components/DNav";
import "../Styles/Dashboard.css";
import Order from "../Components/Order";
import { useStateValue } from "../StateProvider";

function Orders() {
	let [{ store }] = useStateValue();
	return (
		<div className="ordC">
			<DNav />
			<div>
				<h1>Orders</h1>
				<div className="ords">
					{store.length > 0 ? (
						<ol>
							{store.map((i, n) => {
								return (
									<li key={n}>
										<Order key={n} prod={i} />
									</li>
								);
							})}
						</ol>
					) : (
						<h3 className="nit">No order yet</h3>
					)}
				</div>
			</div>
		</div>
	);
}

export default Orders;
