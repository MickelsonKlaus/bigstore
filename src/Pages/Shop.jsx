import Product from "../Components/Product";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import Filter from "../Components/Filter";
import Skeleton from "../Components/Skeleton";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

function Shop() {
	const [{ products, user }, dispatch] = useStateValue();

	useEffect(() => {
		async function getAllProducts() {
			let productsRef = collection(db, "store");

			let q = query(productsRef);
			let querySnapShot = await getDocs(q);

			let data = [];
			querySnapShot.forEach((doc) => {
				data.push({ id: doc.id, ...doc.data() });
			});

			dispatch({
				type: "PRODUCTS",
				products: data,
			});
		}

		getAllProducts();
	}, [dispatch]);

	return (
		<div style={{ position: "relative" }}>
			<Nav />
			<div className="products">
				{products.length > 0 ? (
					<div className="prc">
						{products.map((prod, index) => {
							return <Product key={index} prod={prod} />;
						})}
					</div>
				) : (
					<Skeleton n={20} />
				)}
			</div>
			<Filter />
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

export default Shop;
