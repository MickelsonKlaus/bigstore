import { Link } from "react-router-dom";
import "../Styles/Admin.css";

function Admin() {
	return (
		<div className="admin">
			<nav>
				<Link to="/">
					<img
						src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
						alt="bigstore logo"
					/>
				</Link>

				<ul>
					<li>
						<Link to="/admin">Admin Board</Link>
					</li>
					<li className="ctrBtn">
						<Link to="/admin/new-product">New Product</Link>
					</li>
				</ul>
			</nav>
			<div className="crd"></div>
		</div>
	);
}

export default Admin;
