import { Link, useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useStateValue } from "../StateProvider";
import { useState } from "react";

import "../Styles/Nav.css";

function Nav() {
	let [{ cart, user }] = useStateValue();
	let push = useNavigate();

	const [Search, setSearch] = useState("");
	const handleChange = (event) => {
		setSearch(event.target.value);
	};

	const opsb = () => {
		if (document.querySelector(".smd").classList.contains("open")) {
			document.querySelector(".smd").classList.remove("open");
			document.querySelector(".smd").classList.add("close");
		} else {
			document.querySelector(".smd").classList.remove("close");
			document.querySelector(".smd").classList.add("open");
		}
	};

	//fix form error
	let searchR = () => {
		push(`/search?t=${Search}`);
	};

	return (
		<>
			<nav className="nav">
				<div className="lsn">
					<ul>
						<li>
							<Link to="/">
								<img
									src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
									alt="bigstore logo"
									className="nav__logo"
								/>
							</Link>
						</li>
						<li>
							<Link to="/shop">shop</Link>
						</li>
						<li>
							<Link to="/shop/men">men</Link>
						</li>
						<li>
							<Link to="/shop/women">women</Link>
						</li>
						<li>
							<Link to="/shop/kids">kids</Link>
						</li>
						<li>
							<Link to="/shop/others">others</Link>
						</li>
					</ul>
					<ul>
						<form
							action=""
							onSubmit={(e) => e.preventDefault()}
							onKeyPress={(e) => {
								if (e.code === "Enter") {
									searchR();
								}
							}}
							value={Search}
							className="fsic"
						>
							<input type="text" name="search" id="" onChange={handleChange} />
							<button type="button">
								<SearchOutlinedIcon onClick={searchR} />
							</button>
						</form>
						<li className="sic" onClick={opsb}>
							<SearchOutlinedIcon />
							<span>Search</span>
						</li>
						<li>
							<Link
								to={Object.keys(user).length > 0 ? "/dashboard/" : "/login"}
							>
								<AccountCircleOutlinedIcon />
								<span>
									{Object.keys(user).length > 0 ? "Dashboard" : "Account"}
								</span>
							</Link>
						</li>
						<li>
							<Link to="/cart" className="nav__basket">
								<span>{cart.length > 0 ? cart.length : 0}</span>
								<ShoppingCartOutlinedIcon />
								<span>Cart</span>
							</Link>
						</li>
						<li>
							<Link to="/help">
								<HelpOutlineOutlinedIcon />
								<span>Help</span>
							</Link>
						</li>
					</ul>
				</div>
				<ul className="mvs">
					<li>
						<Link to="/shop">shop</Link>
					</li>
					<li>
						<Link to="/shop/men">men</Link>
					</li>
					<li>
						<Link to="/shop/women">women</Link>
					</li>
					<li>
						<Link to="/shop/kids">kids</Link>
					</li>
					<li>
						<Link to="/shop/ebooks">ebooks</Link>
					</li>
				</ul>
			</nav>
			<div className="smd">
				<form action="" onSubmit={(e) => e.preventDefault()}>
					<input
						type="text"
						name="search"
						value={Search}
						onKeyPress={(e) => {
							if (e.code === "Enter") {
								searchR();
							}
						}}
						id=""
						onChange={handleChange}
					/>
					<button type="button">
						<SearchOutlinedIcon onClick={searchR} />
					</button>
				</form>
			</div>
		</>
	);
}

export default Nav;
