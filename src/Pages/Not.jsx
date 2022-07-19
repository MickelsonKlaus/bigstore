import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import "../Styles/Not.css";

function Not() {
	return (
		<div className="not">
			{Array(3)
				.fill()
				.map((_, i) => {
					return <Particles key={i} n={i !== 0 ? i + 1 : ""} />;
				})}
			<div>
				<h1>4 0 4</h1>
				<h2>Page not found</h2>
				<Link to="/shop">Continue Shopping</Link>
			</div>
		</div>
	);
}

export default Not;
