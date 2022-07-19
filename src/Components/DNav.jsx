import { Link, NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import "../Styles/Dashboard.css";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function DNav() {
	let [{ cart, user }, dispatch] = useStateValue();

	let { username, profilePic } = user;

	let logOut = () => {
		signOut(auth)
			.then(() => {
				dispatch({
					type: "DEL",
				});
			})
			.catch((err) => console.error(err));
	};
	return (
		<nav className="dshb__nav">
			<div className="nll">
				<Link to="/">
					<img
						src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
						alt="bigstore logo"
						className="nav__logo"
					/>
				</Link>
				<ul>
					{user.admin === true && (
						<li>
							<Link to="/admin">
								<AccountCircleOutlinedIcon />
								<span>Admin</span>
							</Link>
						</li>
					)}
					<li>
						<Link to="#logout" onClick={logOut}>
							<AccountCircleOutlinedIcon />
							<span>Logout</span>
						</Link>
					</li>
					<li>
						<Link to="/cart" className="nav__g">
							<span>{cart.length > 0 ? cart.length : 0}</span>
							<ShoppingCartOutlinedIcon />
							<span>Cart</span>
						</Link>
					</li>
					<li>
						<Link to="#notification" className="nav__g">
							<span>0</span>
							<NotificationsOutlinedIcon />
							<span>Notification</span>
						</Link>
					</li>
				</ul>
			</div>
			<div className="mva">
				<div className="npm">
					<img src={profilePic} alt="" />
					<h3 className="nam">{username}</h3>
				</div>
				<ul>
					<li>
						<NavLink to="/dashboard/" activeclasssname={"active"}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/orders">Orders</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/affiliate">Affiliate</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/withdraw">Withdraw</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/payments">Payments</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/settings">Settings</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default DNav;
