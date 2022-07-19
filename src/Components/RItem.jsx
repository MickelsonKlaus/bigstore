import CurrencyFormatter from "react-currency-formatter";

function RItem({ item }) {
	let { id, img, name, price, slash = 0, quantity, desc = "" } = item;

	return (
		<div className="crt__item rit" id={id}>
			<img src={img} alt={name} />
			<div>
				<h3 style={{ marginBottom: "5px" }}>{name}</h3>
				<p style={{ marginBottom: "10px" }}>{desc}</p>
				<span className="sp">
					{slash === 0 ? (
						<p>
							Price:&nbsp;
							{price === 0 ? (
								"free"
							) : (
								<CurrencyFormatter quantity={price} currency={"NGN"} />
							)}
						</p>
					) : (
						<>
							<p className="crt__slash">
								Price:&nbsp;
								<CurrencyFormatter quantity={price} currency={"NGN"} />
							</p>
							<p>
								Slash:&nbsp;
								<CurrencyFormatter quantity={slash} currency={"NGN"} />
							</p>
						</>
					)}
				</span>
				<p>Quantity: {quantity}</p>
			</div>
		</div>
	);
}

export default RItem;
