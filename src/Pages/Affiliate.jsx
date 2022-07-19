import DNav from "../Components/DNav";
import "../Styles/Dashboard.css";
import { useStateValue } from "../StateProvider";
import { v4 as uuidv4 } from "uuid";
import { doc, collection, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useState } from "react";

function Affiliate() {
	let userRef = collection(db, "users");
	let [{ user }, dispatch] = useStateValue();
	let { link, people } = user;
	let copy = (e) => {
		//e.title = "copied"
		navigator.clipboard.writeText(e.textContent);
	};

	let [generating, setGenerating] = useState(false);

	let generate = (e) => {
		e.preventDefault();
		setGenerating(true);
		let new_link = uuidv4();

		//change this line of code before deployment

		async function updateLink() {
			let uid = auth.currentUser.uid;

			let d = doc(userRef, uid);

			await updateDoc(d, { link: new_link })
				.then(() => {
					dispatch({ type: "LNK", link: new_link });
					setGenerating(false);
				})
				.catch((err) => {
					console.error(err);
					setGenerating(false);
				});
		}
		updateLink();
	};
	return (
		<div className="aff">
			<DNav />
			<div>
				<form action="" onSubmit={generate}>
					{link && <p>{people} people have used the link so far</p>}
					{link && (
						<p>
							My Affiliate Link (click to copy):{" "}
							<span title="click to copy" onClick={(e) => copy(e.target)}>
								{`https://bigstore-70bec.web.app/${link}`}
							</span>
						</p>
					)}
					{link && (
						<p className="nty">
							NB: If you generate a new link, your old one will be disable and
							you will no longer recieve payment from it.
						</p>
					)}
					<label htmlFor="afl">
						Generate affiliate link
						<input
							type="text"
							name="affiliate"
							id="afl"
							placeholder="e.g https://shop-bigstore.com/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
							readOnly={true}
							style={{ cursor: "default", outline: "none" }}
						/>
					</label>
					{link ? (
						<button
							disabled={generating}
							className={generating ? "disabled" : ""}
						>
							{generating ? "Generating" : "Generate New Link"}
						</button>
					) : (
						<button
							disabled={generating}
							className={generating ? "disabled" : ""}
						>
							{generating ? "Generating" : "Generate"}
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default Affiliate;
