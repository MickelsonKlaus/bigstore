import CurrencyFormatter from "react-currency-formatter";

function Order({ prod }) {
	return (
		<>
			{prod.items.map((i, n) => {
				let { id, img, name, price, slash = 0, discount = "" } = i;

				return (
					<div id={id} className="ord" key={n}>
						{discount && <p className="dsc">-{discount}%</p>}
						<img src={img} alt={name} />
						<div>
							<h3>{name}</h3>
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
						</div>
					</div>
				);
			})}
			{prod.delivered ? (
				<p className="del">Delivered</p>
			) : (
				<p className="ped">Pending</p>
			)}
		</>
	);
}

export default Order;
