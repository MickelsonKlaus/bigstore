import "../Styles/Dashboard.css";
import DNav from "../Components/DNav";
import Input from "../Components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { doc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth, deleteUser } from "../firebase";
import { useStateValue } from "../StateProvider";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Settings() {
	const [checkedA, setCheckedA] = useState(false);
	const [checkedE, setCheckedE] = useState(false);

	let [{ user }, dispatch] = useStateValue();

	let userRef = collection(db, "users");
	let handleChangeA = (e) => {
		setCheckedA(e.target.checked);
	};
	let handleChangeE = (e) => {
		setCheckedE(e.target.checked);
	};
	let [username, setUsername] = useState();
	let [Img, setImg] = useState();

	//loading actions/states
	let [uploading, setUploading] = useState(false);
	let [updating, setUpdating] = useState(false);
	let [deleting, setDeleting] = useState(false);
	let [wrong, setWrong] = useState(false);
	let handle = (e) => {
		if (e.target.name === "username") {
			setUsername(e.target.value);
		} else {
			let file = e.target.files[0];
			setImg(file);
		}
	};

	let [Del, setDel] = useState();

	let handleDel = (e) => {
		setDel(e.target.value);
	};

	let show = () => {
		let dle = document.querySelector(".del__msg");

		dle.classList.add("show");
	};
	let hide = () => {
		let dle = document.querySelector(".del__msg");

		dle.classList.remove("show");
	};
	let update__username = async (e) => {
		setUpdating(true);
		e.preventDefault();

		let d = doc(userRef, auth.currentUser.uid);

		await updateDoc(d, { username })
			.then(() => {
				dispatch({ type: "USN", username });
				setUsername("");
				setUpdating(false);
			})
			.catch((err) => {
				setUpdating(false);
				console.error(err);
			});
	};

	let upload = (e) => {
		setUploading(true);
		e.preventDefault();
		const storage = getStorage();
		const storageRef = ref(storage, `Images/${Img.name}`);

		// 'file' comes from the Blob or File API
		uploadBytes(storageRef, Img)
			.then((snapshot) => {
				let imgRef = ref(storage, snapshot.metadata.fullPath);
				getDownloadURL(imgRef).then(async (url) => {
					let uid = auth.currentUser.uid;

					let d = doc(userRef, uid);

					await updateDoc(d, { profilePic: url })
						.then(() => {
							setUploading(false);
							dispatch({ type: "USP", profilePic: url });
							//fix this
							//document.querySelector(".file__upload").files[0] = "";
						})
						.catch((err) => {
							setUploading(false);
							console.error(err);
						});
				});
			})
			.catch((err) => {
				setUploading(false);
				console.error(err);
			});
	};

	let delete__user = (e) => {
		e.preventDefault();

		if (Del === user.username) {
			setDeleting(true);
			deleteUser(auth.currentUser)
				.then(async () => {
					await deleteDoc(doc(db, "users", auth.currentUser.uid));
					dispatch({
						type: "DEL",
					});
					setDeleting(false);
					setWrong(false);
				})
				.catch((err) => console.error(err));
		} else {
			setDeleting(false);
			setWrong(true);
		}
	};
	return (
		<div className="stc">
			<DNav />
			<div className="stt">
				<div className="usr">
					<h6>General Settings</h6>
					<form action="" onSubmit={update__username}>
						<Input
							id={"usn"}
							label={"Change username"}
							type={"text"}
							name={"username"}
							placeholder={"New username"}
							handleChange={handle}
							value={username}
						/>
						<button disabled={updating} className={updating ? "disabled" : ""}>
							{updating ? "Changing" : "Change"}
						</button>
					</form>
					<form action="" onSubmit={upload}>
						<label htmlFor="pp">
							Change profile picture&nbsp;
							<input
								type="file"
								name="prop"
								id="pp"
								accept="image/*"
								onChange={handle}
								className="file__upload"
							/>
						</label>
						<button
							disabled={uploading}
							className={uploading ? "disabled" : ""}
						>
							{uploading ? "Uploading" : "Upload"}
						</button>
					</form>
					<div className="rst">
						<h5>Reset password</h5>
						<Link to="/reset">Reset</Link>
					</div>
				</div>
				<div className="ntf">
					<h6>Notifications</h6>
					<span>
						Turn off notification &nbsp;
						<Switch
							checked={checkedA}
							onChange={handleChangeA}
							inputProps={{ "aria-label": "controlled" }}
						/>
					</span>
					<span>
						Turn off email notification&nbsp;
						<Switch
							checked={checkedE}
							onChange={handleChangeE}
							inputProps={{ "aria-label": "controlled" }}
						/>
					</span>
				</div>
				<div className="dng">
					<h6>Danger zone </h6>
					<button className="dlt" onClick={show}>
						Delete account
					</button>
				</div>
			</div>
			<div className="del__msg">
				<HighlightOffIcon className="close" onClick={hide} />
				<p>
					Deleting your account will cause you to lose your earning if you have
					any. It will also disable your affiliate link. And most of all this is
					irreversible.
				</p>
				<form action="" onSubmit={delete__user}>
					<Input
						id={"dlm"}
						label={"Enter username"}
						type={"text"}
						name={"username"}
						placeholder={"Username"}
						handleChange={handleDel}
						value={Del}
						classN={wrong ? "wrong" : ""}
					/>
					<button className={deleting ? "disabled dlt" : "dlt"}>
						{deleting ? "Deleting" : "Delete account"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Settings;
