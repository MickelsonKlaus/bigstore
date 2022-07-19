import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CurrencyFormatter from "react-currency-formatter";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import "../Styles/Products.css";

function Product({ prod }) {
	let {
		id,
		img,
		name,
		price = 0,
		slash = 0,
		discount = 0,
		desc,
		download = "",
	} = prod;
	const [, dispatch] = useStateValue();

	let handle = () => {
		dispatch({
			type: "ATB",
			item: {
				id,
				img,
				name,
				price,
				slash,
				desc,
				discount,
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

	let product_dispatch = () => {
		dispatch({
			type: "PROD",
			item: { ...prod },
		});
	};
	return (
		<div id={id} className="product">
			{discount !== 0 ? (
				<p className="dsc">-{discount}%</p>
			) : price === 0 ? (
				<p className="dsc">Free</p>
			) : (
				""
			)}
			<Link to={`/product?id=${id}`} onClick={product_dispatch}>
				<img src={img} alt={name} />
			</Link>
			<h3>{name}</h3>
			<div className="dts">
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
					</a>
				) : (
					<button onClick={handle}>
						<ShoppingCartOutlinedIcon />
					</button>
				)}
			</div>
		</div>
	);
}

export default Product;
