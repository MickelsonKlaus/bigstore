import Nav from "../Components/Nav";
import "../Styles/Categories.css";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../Components/Skeleton";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import Footer from "../Components/Footer";
import Product from "../Components/Product";
import Filter from "../Components/Filter";

function Categories() {
	let ct = useParams();
	let [{ category, user }, dispatch] = useStateValue();
	let [NR, setNR] = useState();

	useEffect(() => {
		async function getCategory() {
			let categoryRef = collection(db, "store");

			let q = query(
				categoryRef,
				where("category", "==", ct.category),
				orderBy("name")
			);
			let querySnapShot = await getDocs(q);

			let data = [];
			querySnapShot.forEach((doc) => {
				data.push({ id: doc.id, ...doc.data() });
			});

			if (data.length === 0) {
				setNR(true);
			}
			dispatch({
				type: "CATE",
				cate: data,
			});
		}

		getCategory();
	}, [dispatch, ct]);
	return (
		<div className="categories">
			<Nav />
			<div className="products">
				<h1
					style={{
						color: "var(--primary)",
						fontSize: "24px",
						textTransform: "capitalize",
						fontWeight: "500",
						marginBottom: "30px",
					}}
				>
					{ct.category}
				</h1>
				{category.length > 0 ? (
					<div className="prc">
						{category.map((prod, index) => {
							return <Product key={index} prod={prod} />;
						})}
					</div>
				) : NR ? (
					<h1
						style={{
							color: "var(--primary)",
							fontSize: "24px",
							textTransform: "capitalize",
							fontWeight: "500",
							marginBottom: "30px",
							textAlign: "center",
						}}
					>
						"No result found"
					</h1>
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

export default Categories;
