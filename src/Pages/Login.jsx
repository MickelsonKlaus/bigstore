import "../Styles/LRF.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { Navigate } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Login() {
	let [{ user }, dispatch] = useStateValue();
	let data = { email: "", password: "" };
	const [LD, setLD] = useState({
		...data,
	});

	let [ErrorMessage, setErrorMessage] = useState("");
	let [logging, setLogging] = useState(false);
	let [logged, setLogged] = useState(false);

	let LoginFields = [
		{
			id: "3ikdd",
			label: "Email",
			type: "email",
			name: "email",
			placeholder: "Enter email address",
		},

		{
			id: "3kdid",
			label: "Password",
			type: "password",
			name: "password",
			placeholder: "Enter Password",
		},
	];

	const handle = (e) => {
		LD[e.target.name] = e.target.value;
		setLD({ ...LD });
	};

	let log_user = (e) => {
		e.preventDefault();

		setLogging(true);
		signInWithEmailAndPassword(auth, LD.email, LD.password)
			.then(async (userCredential) => {
				setLogged(true);
				let user = userCredential.user;

				const docRef = doc(db, "users", user.uid);

				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					dispatch({
						type: "LOGGED",
						user: { ...docSnap.data() },
					});
				} else {
					//dispatch();
				}
			})
			.catch((error) => {
				setLogging(false);
				setErrorMessage(error.message);
			});
	};

	return (
		<div className="lf">
			{Object.keys(user).length === 0 ? (
				<>
					<Link to="/">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
							alt=""
						/>
					</Link>
					<div className="form">
						<form id="form" onSubmit={log_user}>
							<h2>Log into your account</h2>
							<p className={ErrorMessage && "err"}>
								{ErrorMessage?.split("(")[1]?.replace(")", "")}
							</p>
							{LoginFields.map((detail, index) => {
								return (
									<Input
										key={index}
										id={detail.id}
										label={detail.label}
										type={detail.type}
										name={detail.name}
										placeholder={detail.placeholder}
										handleChange={handle}
										value={LD[detail.name]}
									/>
								);
							})}
							<button disabled={logging} className={logging ? "disabled" : ""}>
								{logging ? (logged ? "Logged In" : "Logging In") : "Log In"}
							</button>
							<p className="fgt">
								Forgot password?&nbsp;
								<Link to="/reset">Reset </Link>
							</p>
						</form>
					</div>
					<p className="reg">
						Don't have an account ?{" "}
						<Link to="/register" className="reg__btn">
							Register
						</Link>
					</p>
				</>
			) : (
				<Navigate to="/dashboard/" replace={true} />
			)}
		</div>
	);
}

export default Login;
