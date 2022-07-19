import "../Styles/LRF.css";
import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function Reset() {
	let [email, setEmail] = useState();
	let [msg, setMsg] = useState("");
	let [resetting, setResetting] = useState(false);
	let handle = (e) => {
		setEmail(e.target.value);
	};

	let reset__pwd = (e) => {
		e.preventDefault();
		sendPasswordResetEmail(auth, email)
			.then((sent) => {
				console.log(sent);
				setMsg("A password reset email has been sent to you");
				setResetting(true);
			})
			.catch((err) => {
				setMsg(err.message);
				setResetting(false);
			});
	};

	return (
		<div className="lf reset">
			<Link to="/">
				<img
					src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
					alt=""
				/>
			</Link>
			<div className="form">
				<form onSubmit={reset__pwd}>
					{msg !== "" && (
						<p
							style={{
								padding: "10px",
								borderRadius: "5px",
								background: "#5ab280bd",
								color: "white",
								textAlign: "center",
								margin: "0 auto",
								width: "90%",
								marginBottom: "10px",
							}}
						>
							{msg?.split("(")[1]?.replace(")", "")}
						</p>
					)}
					<Input
						id={"reset"}
						label={"Reset your password"}
						type={"email"}
						name={"reset"}
						placeholder={"Enter your email address"}
						handleChange={handle}
						value={email}
					/>
					<button disabled={resetting} className={resetting ? "disabled" : ""}>
						{resetting ? "Resetting" : "Reset"}
					</button>
					<Link to="/login" className="bck">
						Back
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Reset;
