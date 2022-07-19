import "../Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="ft">
			<div className="ft__about">
				<h2>About Us</h2>
				<p>
					Bigstore is a represention of the nigerian regular store but with a
					unique touch. Customer driven. Customers satisfaction is goal. Taking
					regular stores to the next level is the main motive behind the
					creation of bigstore. Offering more is all will care about.
				</p>
			</div>
			<div className="fts__ctg">
				<h2>Our Categories</h2>
				<ul>
					<li>
						<Link to="/shop/men">Men</Link>
					</li>
					<li>
						<Link to="/shop/women">Women</Link>
					</li>
					<li>
						<Link to="/shop/kids">Kids</Link>
					</li>
					<li>
						<Link to="/shop/ebooks">Ebooks</Link>
					</li>
				</ul>
			</div>
			<div>
				<h2>More from us</h2>
				<ul>
					<li>
						<Link to="#">Story</Link>
					</li>
					<li>
						<Link to="#">Private policy</Link>
					</li>
					<li>
						<Link to="#">Terms &amp; Conditions</Link>
					</li>
					<li>
						<Link to="/help">Help</Link>
					</li>
				</ul>
			</div>
			<div>
				<h2>My Account</h2>
				<ul>
					<li>
						<Link to="/dashboard/affiliate">Affiliate</Link>
					</li>
					<li>
						<Link to="/cart">Cart</Link>
					</li>
					<li>
						<Link to="/dashboard/orders">Orders</Link>
					</li>
					<li>
						<Link to="#">History</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
