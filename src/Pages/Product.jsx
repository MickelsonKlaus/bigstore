import "../Styles/SP.css";
import CurrencyFormatter from "react-currency-formatter";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useEffect } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { db } from "../firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useStateValue } from "../StateProvider";

function Product() {
	let [prod, setProd] = useState({});

	let [{ user }, dispatch] = useStateValue();
	let {
		id = "",
		img = "",
		name = "",
		price = 0,
		slash = 0,
		discount = 0,
		desc = "",
		download = "",
	} = prod;

	let params = useLocation().search.split("=")[1];

	useEffect(() => {
		async function getProduct() {
			let productRef = collection(db, "store");

			let docSnap = await getDoc(doc(productRef, params));

			if (docSnap.exists()) {
				setProd({ ...docSnap.data() });
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}
		getProduct();
	}, [params]);

	let handle = () => {
		dispatch({
			type: "ATB",
			item: {
				id,
				img,
				name,
				price,
				slash,
				discount,
				desc,
				quantity: 1,
			},
		});

		document.querySelector(".notify").classList.remove("close");
		document.querySelector(".notify").classList.add("open");
		setTimeout(() => {
			document.querySelector(".notify").classList.remove("open");
			document.querySelector(".notify").classList.add("close");
		}, 5000);

		setTimeout(() => {
			document.querySelector(".notify").classList.remove("open");
			document.querySelector(".notify").classList.remove("close");
		}, 10000);
	};

	return (
		<>
			<Nav />
			<Link to="/shop" className="bck">
				Back to shop
			</Link>
			<div style={{ minHeight: "50vh" }}>
				{Object.keys(prod).length > 0 ? (
					<div className="prod" id={id}>
						<img src={img} alt={name} />
						<div className="prod__details">
							{discount !== 0 ? (
								<p className="dsc">-{discount}%</p>
							) : price === 0 ? (
								<p className="dsc">Free</p>
							) : (
								""
							)}
							<h1>{name}</h1>
							<p className="desc">{desc}</p>
							<span>
								{slash === 0 ? (
									<p>
										{price === 0 ? (
											"free"
										) : (
											<CurrencyFormatter quantity={price} currency={"NGN"} />
										)}
									</p>
								) : (
									<>
										<p className="slash">
											<CurrencyFormatter quantity={price} currency={"NGN"} />
										</p>
										<p>
											<CurrencyFormatter quantity={slash} currency={"NGN"} />
										</p>
									</>
								)}
							</span>
							{price === 0 ? (
								<a href={download} download={`${name}`}>
									<DownloadRoundedIcon />
									Download
								</a>
							) : (
								<button onClick={handle}>
									<ShoppingCartOutlinedIcon /> Add to Cart
								</button>
							)}
						</div>
					</div>
				) : (
					<div></div>
				)}
			</div>
			{Object.keys(user).length === 0 && (
				<div className="pxl">
					<p>Sign in for personalized recommendations</p>
					<Link to="/login">Login</Link>
				</div>
			)}
			<Footer />
		</>
	);
}

export default Product;
