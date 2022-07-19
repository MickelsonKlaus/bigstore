import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useStateValue } from "../StateProvider";
import CurrencyFormatter from "react-currency-formatter";
import Item from "../Components/Item";
import "../Styles/Cart.css";
import Footer from "../Components/Footer";

function Cart() {
	const [{ cart, user }] = useStateValue();

	const total = (st = 0) => {
		let tp = [];
		if (cart.length > 0) {
			cart.forEach((item) => {
				tp.push(
					item.slash > 0
						? item.slash * item.quantity
						: item.price * item.quantity
				);
			});

			tp = tp.reduceRight((total, value) => {
				return total + value;
			});

			return tp - st;
		}
	};

	return (
		<div className="crt">
			<Nav />
			<div className="crt__items">
				<h3>Your Cart Items</h3>
				<div className={cart.length > 0 ? "crt__cl" : "crt__off"}>
					{cart.length === 0 ? (
						<>
							<h3>
								<ShoppingCartOutlinedIcon />
								Your cart is empty
							</h3>
							<Link to="/shop" className="crt__link">
								Continue to Shop
							</Link>
						</>
					) : (
						<>
							<div>
								{cart.map((item) => {
									return <Item key={item.id} item={item} />;
								})}
							</div>
							<div className="stp">
								<h5>
									<span>Subtotal:</span>
									<CurrencyFormatter quantity={total()} currency={"NGN"} />
								</h5>
								<h4>
									<span>Total:</span>
									<CurrencyFormatter quantity={total()} currency={"NGN"} />
								</h4>
								<Link to="/checkout">Checkout</Link>
							</div>
						</>
					)}
				</div>
			</div>
			{Object.keys(user).length === 0 && (
				<div className="pxl">
					<p>Sign in for personalized recommendations</p>
					<Link to="/login">Login</Link>
				</div>
			)}
			<Footer />
		</div>
	);
}

export default Cart;
