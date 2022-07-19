import "../Styles/Receipt.css";
import "../Styles/Not.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import RItem from "../Components/RItem";
import Particles from "../Components/Particles";
import "../Styles/Not.css";

function Receipt() {
	const [{ receipt }] = useStateValue();

	return (
		<div className={receipt.length > 0 ? "receipt rt" : "receipt"}>
			{receipt.length <= 0 ? (
				<div className="nth">
					{Array(3)
						.fill()
						.map((_, i) => {
							return <Particles key={i} n={i !== 0 ? i + 1 : ""} />;
						})}
					<h1>No Checkouts has been made</h1>
					<p>There is no receipt to show.</p>
					<Link to="/checkout">Go Checkout</Link>
				</div>
			) : (
				<>
					<Link to="/" style={{ alignSelf: "flex-start" }}>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
							alt=""
						/>
					</Link>
					<h1 style={{ alignSelf: "flex-start" }}>Order Receipt</h1>
					<div className="rtt">
						<div>
							{receipt.map((item, index) => {
								return <RItem key={index} item={item} />;
							})}
						</div>
						<div className="info">
							<h3>Infos</h3>
							<ul>
								<li>
									A payment receipt has been sent to the email you provided.
								</li>
								<li>
									Also your delivery driver will contact you within the next
									hour.
								</li>
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Receipt;
