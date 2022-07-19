import { Link } from "react-router-dom";
import "../Styles/Admin.css";
import Input from "../Components/Input";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewProduct() {
	const [checked, setChecked] = useState(false);
	let [keywords, setKeywords] = useState([]);
	let [img, setImg] = useState("");
	let [download, setDownload] = useState("");
	let [ready, setReady] = useState(true);
	let [GettingI, setGettingI] = useState(false);
	let [GettingF, setGettingF] = useState(false);
	let [MsgI, setMsgI] = useState("Getting image URL.... Please wait");
	let [MsgF, setMsgF] = useState("Getting file URL.... Please wait");
	let [Adding, setAdding] = useState(false);
	const storage = getStorage();
	let storeRef = collection(db, "store");

	let data = {
		name: "",
		price: 0,
		slash: 0,
		discount: 0,
		category: "others",
		desc: "",
	};
	const [Details, setDetails] = useState({
		...data,
	});

	const handleChange = (e) => {
		setChecked(e.target.checked);
	};

	const handle = (e) => {
		//first five
		if (e.target.name === "name") {
			generateKeywords(e.target.value.toLowerCase());
		}
		if (typeof e.target.name === "string") {
			e.target.value = e.target.value.toLowerCase();
		}
		if (
			e.target.name === "price" ||
			e.target.name === "slash" ||
			e.target.name === "discount"
		) {
			e.target.value = Number(e.target.value);
		}
		Details[e.target.name] = e.target.value;
		setDetails({ ...Details });
	};

	function generateKeywords(value) {
		let words = [];
		let letter = "";
		value.split("").forEach((l) => {
			letter += l;
			words.push(letter);
		});

		setKeywords(words);
		//console.log(words);
	}

	//console.log(Details);
	let productFields = [
		{
			id: "np1",
			label: "name*",
			type: "text",
			name: "name",
			placeholder: "Product name",
		},
		{
			id: "np2",
			label: "price (NGN)*",
			type: "number",
			name: "price",
			placeholder: "Product price",
		},
		{
			id: "np3",
			label: "slash (NGN)",
			type: "number",
			name: "slash",
			placeholder: "Slash",
			required: false,
		},
		{
			id: "np4",
			label: "discount (%)",
			type: "number",
			name: "discount",
			placeholder: "Product discount in percentage",
			required: false,
		},
		{
			id: "np5",
			label: "category",
			type: "text",
			name: "category",
			placeholder: "Product category (default: others)",
			required: false,
		},
	];

	let uploadImg = (e) => {
		if (e.target.files[0]) {
			let storageRef = ref(storage, `Images/${e.target.files[0].name}`);

			setGettingI(true);
			console.log(e.target.files[0]);
			// 'file' comes from the Blob or File API
			console.log(storageRef);
			uploadBytes(storageRef, e.target.files[0])
				.then((snapshot) => {
					let imgRef = ref(storage, snapshot.metadata.fullPath);
					getDownloadURL(imgRef).then((url) => {
						console.log(url);
						setImg(url);
						setGettingI(false);
						setReady(false);
					});
				})
				.catch((err) => {
					setGettingI(false);
					setMsgI(err.message);
					console.error(err);
				});
		}
	};

	let uploadFile = (e) => {
		if (e.target.files[0]) {
			let storageRef = ref(storage, `pdfs/${e.target.files[0].name}`);

			setGettingF(true);
			// 'file' comes from the Blob or File API
			uploadBytes(storageRef, e.target.files[0])
				.then((snapshot) => {
					let fileRef = ref(storage, snapshot.metadata.fullPath);
					getDownloadURL(fileRef).then(async (url) => {
						setReady(false);
						setGettingF(false);
						setDownload(url);
					});
				})
				.catch((err) => {
					setGettingF(false);
					setMsgF(err.message);
					console.error(err);
				});
		}
	};

	let handleSubmit = async (e) => {
		setAdding(true);
		e.preventDefault();

		Details.price = Number(Details.price);
		Details.slash = Number(Details.slash);
		Details.discount = Number(Details.discount);
		setDetails({ ...Details });

		let res = await setDoc(doc(storeRef), {
			...Details,
			img,
			download,
			keywords: [...keywords],
			featured: checked,
		});

		console.log(res);
		if (!res) {
			setReady(true);
			setAdding(false);
		}
	};
	//console.log(Details);
	return (
		<div className="admin">
			<nav>
				<Link to="/">
					<img
						src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
						alt="bigstore logo"
					/>
				</Link>

				<ul>
					<li>
						<Link to="/admin">Admin Board</Link>
					</li>
					<li className="ctrBtn">
						<Link to="/admin/new-product">New Product</Link>
					</li>
				</ul>
			</nav>
			<div className="npd">
				<form action="" onSubmit={handleSubmit}>
					<h2>Add new product</h2>
					<div className="form__flex">
						<div>
							{productFields.map((detail, index) => {
								let {
									id,
									label,
									type,
									name,
									placeholder = "",
									value = "",
									required = true,
								} = detail;
								return (
									<Input
										key={index}
										id={id}
										label={label}
										type={type}
										name={name}
										placeholder={placeholder}
										value={value}
										handleChange={handle}
										required={required}
									/>
								);
							})}
							<label htmlFor="kyw" className="disabled">
								Keywords
								<input
									type="text"
									name="keywords"
									id="kyw"
									disabled
									value={keywords}
								/>
							</label>
						</div>
						<div>
							<label htmlFor="desc">
								Description*
								<textarea
									name="desc"
									id="desc"
									cols="30"
									rows="10"
									required
									onChange={handle}
								></textarea>
							</label>
							<label htmlFor="pi">
								Product Image*&nbsp;
								{GettingI && <p style={{ fontSize: ".8em" }}>{MsgI}</p>}
								<input
									type="file"
									name="prop"
									id="pi"
									accept="image/*"
									style={{ color: "var(--primary)" }}
									required
									onChange={uploadImg}
								/>
							</label>
							<label htmlFor="df">
								Downloadable file (only for file products)&nbsp;
								{GettingF && <p style={{ fontSize: ".8em" }}>{MsgF}</p>}
								<input
									type="file"
									name="prop"
									id="df"
									accept=".pdf"
									onChange={uploadFile}
									style={{ color: "var(--primary)" }}
								/>
							</label>
							<span>
								Featured &nbsp;
								<Switch
									checked={checked}
									onChange={handleChange}
									inputProps={{ "aria-label": "controlled" }}
								/>
							</span>
							<button
								disabled={ready}
								className={ready || Adding ? "disabled" : ""}
							>
								{Adding ? "Adding" : "Add"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default NewProduct;
