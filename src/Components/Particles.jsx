import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Particles({ n = "" }) {
	return (
		<div>
			{Array(6)
				.fill()
				.map((_, i) => {
					return (
						<h3 key={i} className={`qst${n}`} style={{ "--i": i + 1 }}>
							<ShoppingCartOutlinedIcon />
						</h3>
					);
				})}
		</div>
	);
}

export default Particles;
