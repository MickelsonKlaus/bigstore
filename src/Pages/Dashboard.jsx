import "../Styles/Dashboard.css";
import { useStateValue } from "../StateProvider";
import DNav from "../Components/DNav";
import CurrencyFormatter from "react-currency-formatter";
import { useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";

function Dashboard() {
	let [{ user }, dispatch] = useStateValue();

	let { earning = 0, rw, orders = 0, delivered = 0, delivering = 0 } = user;

	useEffect(() => {
		async function getSP() {
			let userRef = collection(db, "users");
			let storeRef = collection(doc(userRef, auth.currentUser.uid), "store");
			let paymentsRef = collection(
				doc(userRef, auth.currentUser.uid),
				"payments"
			);

			const querySnapshot = await getDocs(storeRef);
			let storeData = [];
			querySnapshot.forEach((doc) => {
				storeData.push({ id: doc.id, ...doc.data() });
			});

			const querySnapshot2 = await getDocs(paymentsRef);
			let paymentsData = [];
			querySnapshot2.forEach((doc) => {
				paymentsData.push({ id: doc.id, ...doc.data() });
			});

			if (storeData.length !== 0 && paymentsData.length !== 0) {
				dispatch({
					type: "POD",
					payments: paymentsData,
					store: storeData,
				});
			}
			//console.log(storeData, paymentsData);
		}

		getSP();
	}, [dispatch]);

	return (
		<div className="dshb">
			<DNav />
			<div className="main">
				<div className="usd">
					<div>
						<h3>Earnings</h3>
						<h1>
							<CurrencyFormatter quantity={earning} currency={"NGN"} />
						</h1>
					</div>
					<div>
						<h3>Pending Withdrawal</h3>
						<h1>
							<CurrencyFormatter quantity={rw?.amount} currency={"NGN"} />
						</h1>
					</div>
					<div>
						<h3>Orders</h3>
						<h1>{orders}</h1>
					</div>
					<div>
						<h3>Delivered</h3>
						<h1>{delivered}</h1>
					</div>
					<div>
						<h3>Delivering</h3>
						<h1>{delivering}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
