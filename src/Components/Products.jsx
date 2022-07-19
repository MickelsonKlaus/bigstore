import { Link } from "react-router-dom";
import Product from "./Product";
import "../Styles/Products.css";
import Skeleton from "./Skeleton";

function Products({ data, nl = false }) {
	return (
		<div className="products">
			{data.length > 0 ? (
				data.map((single, index) => {
					return (
						<div key={index}>
							<span className="heading">
								<h2>{single.title}</h2>
								{!nl && <Link to={`/shop/${single.title}`}>more</Link>}
							</span>
							<div className="prc">
								{single.items.map((prod, index) => {
									return <Product key={index} prod={prod} />;
								})}
							</div>
						</div>
					);
				})
			) : (
				<Skeleton />
			)}
		</div>
	);
}

export default Products;
