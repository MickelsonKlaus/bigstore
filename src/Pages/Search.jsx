import React from "react";
import Nav from "../Components/Nav";
import { useLocation } from "react-router-dom";
import Skeleton from "../Components/Skeleton";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
import Product from "../Components/Product";

function Search() {
	let term = useLocation().search.split("=")[1].replace(/%20/g, " ");
	let [results, setResults] = useState([]);
	let [NR, setNR] = useState(false);

	useEffect(() => {
		setResults([]);
		async function getResults() {
			let categoryRef = collection(db, "store");

			let q = query(
				categoryRef,
				where("keywords", "array-contains", term.toLowerCase()),
				orderBy("name")
			);
			let querySnapShot = await getDocs(q);

			let data = [];
			querySnapShot.forEach((doc) => {
				data.push({ id: doc.id, ...doc.data() });
			});

			setResults(data);
			if (data.length === 0) {
				setNR(true);
			}
		}

		getResults();
	}, [term]);
	return (
		<div>
			<Nav />
			<div style={{ padding: "30px" }}>
				{results.length > 0 && (
					<h1
						style={{
							color: "var(--primary)",
							fontSize: "24px",
							textTransform: "capitalize",
							fontWeight: "500",
							marginBottom: "30px",
						}}
					>
						{results.length} results
					</h1>
				)}

				{results.length > 0 ? (
					<div className="sre">
						{results.map((prod, index) => {
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
					<Skeleton n={5} />
				)}
			</div>
		</div>
	);
}

export default Search;
