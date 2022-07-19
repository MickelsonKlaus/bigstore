import "../Styles/LRF.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { Navigate } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Register() {
	let [{ user }, dispatch] = useStateValue();
	let [ErrorMessage, setErrorMessage] = useState("");
	let [registering, setRegistering] = useState(false);
	let [registered, setRegistered] = useState(false);
	let data = { email: "", password: "", username: "" };
	const [RD, setRD] = useState({
		...data,
	});

	let RegisterFields = [
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
		{
			id: "4kyoh",
			label: "What should we call you?",
			type: "text",
			name: "username",
			placeholder: "Enter your username",
		},
	];

	const handle = (e) => {
		RD[e.target.name] = e.target.value;
		setRD({ ...RD });
	};

	const reg_new_user = (e) => {
		e.preventDefault();
		setRegistering(true);
		createUserWithEmailAndPassword(auth, RD.email, RD.password)
			.then((userCredential) => {
				let user = userCredential.user;
				setRegistered(true);
				let userRef = collection(db, "users");

				let new_user = {
					username: RD.username,
					earning: 0,
					admin: false,
					link: "",
					people: 0,
					payments: [],
					lw: { amount: 0, dt: "" },
					rw: { amount: 0, acct: "", name: "", bank: "" },
					rv: [],
					notification: [],
					profilePic:
						"https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2F154901-OV13BH-873.jpg?alt=media&token=92450895-3f24-444d-913f-7a365156f0ce",
					email: user.email,
					accessToken: user.accessToken,
					orders: 0,
					delivered: 0,
					delivering: 0,
				};

				dispatch({
					type: "LOGGED",
					user: { ...new_user },
				});

				setDoc(doc(userRef, user.uid), {
					username: RD.username,
					earning: 0,
					admin: false,
					link: "",
					people: 0,
					lw: { amount: 0, dt: "" },
					rw: { amount: 0, acct: "", name: "", bank: "" },
					rv: [],
					n: true,
					en: false,
					notification: [],
					orders: 0,
					delivered: 0,
					delivering: 0,
					profilePic:
						"https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2F154901-OV13BH-873.jpg?alt=media&token=92450895-3f24-444d-913f-7a365156f0ce",
					email: user.email,
					createdAt: user.metadata.creationTime,
				});
			})
			.catch((error) => {
				setRegistering(false);
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
						<form onSubmit={reg_new_user}>
							<h2>Register an account</h2>
							<p className={ErrorMessage && "err"}>
								{ErrorMessage?.split("(")[1]?.replace(")", "")}
							</p>
							{RegisterFields.map((detail, index) => {
								return (
									<Input
										key={index}
										id={detail.id}
										label={detail.label}
										type={detail.type}
										name={detail.name}
										placeholder={detail.placeholder}
										handleChange={handle}
										value={RD[detail.name]}
									/>
								);
							})}
							<button
								disabled={registering}
								className={registering ? "disabled" : ""}
							>
								{registering
									? registered
										? "Registered"
										: "Registering"
									: "Register"}
							</button>
						</form>
					</div>
					<p className="reg">
						Already have an account ?{" "}
						<Link to="/login" className="reg__btn">
							Login
						</Link>
					</p>
				</>
			) : (
				<Navigate to="/dashboard/" replace={true} />
			)}
		</div>
	);
}

export default Register;
