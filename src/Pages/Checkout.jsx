import { PaystackButton } from "react-paystack";
import { useStateValue } from "../StateProvider";
import CurrencyFormatter from "react-currency-formatter";
import Form from "../Components/Form";
import "../Styles/Checkout.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Particles from "../Components/Particles";
import "../Styles/Not.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
	doc,
	collection,
	setDoc,
	Timestamp,
	updateDoc,
	increment,
} from "firebase/firestore";

function Checkout() {
	//remember to show something when cart is empty
	const [{ cart }, dispatch] = useStateValue();
	let userRef = collection(db, "users");

	let data = {
		name: "",
		phone: "",
		address: "",
		email: "",
	};

	const total = (st = 0) => {
		let tp = [];
		if (cart.length > 0) {
			cart.forEach((item) => {
				tp.push(
					item.slash > 0
						? item.slash * item.quantity
						: item.price * item.quantity
				);
			});

			tp = tp.reduceRight((total, value) => {
				return total + value;
			});

			return tp - st;
		}
	};

	const [Next, setNext] = useState(false);
	const [UD, setUD] = useState(data);

	let navigate = useNavigate();

	let userDetails = [
		{
			id: "3ijid",
			label: "full name",
			type: "text",
			name: "name",
			placeholder: "enter fullname",
		},
		{
			id: "3ijde",
			label: "Phone number",
			type: "tel",
			name: "phone",
			placeholder: "enter phone: business or valid",
		},
		{
			id: "3kdid",
			label: "address",
			type: "text",
			name: "address",
			placeholder: "enter home address",
		},
		{
			id: "3ikdd",
			label: "Email",
			type: "email",
			name: "email",
			placeholder: "enter email address",
		},
	];

	const handle = (e) => {
		UD[e.target.name] = e.target.value;
		setUD(UD);
	};

	const slide = () => {
		setNext(true);
		document.querySelector(".psc__form").style.display = "none";
	};

	const PrevS = () => {
		setNext(false);
		document.querySelector(".psc__form").style.display = "block";
	};

	const totalP = (st = 0) => {
		let tp = [];
		if (cart.length > 0) {
			cart.forEach((item) => {
				tp.push(
					item.slash > 0
						? item.slash * item.quantity
						: item.price * item.quantity
				);
			});

			tp = tp.reduceRight((total, value) => {
				return total + value;
			});

			return tp - st;
		}
	};

	const config = {
		reference: new Date().getTime().toString(),
		email: UD.email,
		amount: total() * 100,
		publicKey: "pk_live_517a3410bdb7ce7f27d15a55c93c14bc2b10de40",
		//pk_test_70c795dbdf5c588cb0f566ff025a6964a4f7c054,
	};

	// you can call this function anything
	const handlePaystackSuccessAction = async (reference) => {
		// Implementation for whatever you want to do with reference and after success call.

		if (auth.currentUser) {
			let d = doc(userRef, auth.currentUser.uid);

			updateDoc(d, { orders: increment(1), delivering: increment(1) })
				.then(() => {
					dispatch({
						type: "OD",
						od: { orders: 1, delivering: 1 },
					});
				})
				.catch((err) => {
					console.error(err);
				});

			let r = collection(d, "store");

			await setDoc(doc(r), {
				items: cart,
				details: {
					email: UD.email,
					name: UD.name,
					phone: UD.phone,
					address: UD.address,
				},
				delivered: false,
				dateTime: Timestamp.now(),
			});

			let p = collection(d, "payments");

			let paymentItems = [];
			cart.forEach((item) => {
				paymentItems.push(item.name);
			});

			let payment = {
				items: paymentItems,
				dateTime: Timestamp.now(),
				totalPrice: totalP(),
			};

			await setDoc(doc(p), payment);

			// dispatch({
			// 	type: "POD",
			// 	payments: [...payment],
			// 	store: storeData,
			// });
		} else {
			let ordersRef = collection(db, "orders");
			await setDoc(doc(ordersRef), {
				items: cart,
				details: {
					email: UD.email,
					name: UD.name,
					phone: UD.phone,
					address: UD.address,
				},
				delivered: false,
				dateTime: Timestamp.now(),
			});
		}
		dispatch({
			type: "RECEIPT",
		});
		navigate("/receipt", { replace: true });

		console.log(reference);
	};

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const componentProps = {
		...config,
		text: "Checkout",
		onSuccess: (reference) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};
	return (
		<div className="psc">
			{cart.length <= 0 && (
				<div className="nth">
					{Array(3)
						.fill()
						.map((_, i) => {
							return <Particles key={i} n={i !== 0 ? i + 1 : ""} />;
						})}
					<h1>Cart is empty</h1>
					<p>There is nothing to pay for.</p>
					<Link to="/shop">Continue Shopping</Link>
				</div>
			)}
			{cart.length > 0 && (
				<>
					<Link to="/">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Flogo.png?alt=media&token=544e88e6-f10d-4fe9-9033-54c13f6358cd"
							alt=""
						/>
					</Link>

					<div className="psc__form">
						<h2>Buyers Details</h2>
						<Form
							details={userDetails}
							bt={true}
							handleChange={handle}
							next={slide}
						/>
					</div>

					{Next && (
						<div className="psc__details" style={{ display: "block" }}>
							<h2>Buyers Details</h2>
							<p>Please cross check details</p>
							<span>
								<h3>Name</h3>
								<p>{UD.name}</p>
							</span>
							<span>
								<h3>Phone number</h3>
								<p>{UD.phone}</p>
							</span>
							<span>
								<h3>Address</h3>
								<p>{UD.address}</p>
							</span>
							<span>
								<h3>Email</h3>
								<p>{UD.email}</p>
							</span>

							<span>
								<h3>Items Buying</h3>
								{cart.map((item, index) => {
									return <p key={index}>{item.name}</p>;
								})}
							</span>

							<span>
								<h3>Total Price</h3>
								<p>
									<CurrencyFormatter quantity={totalP()} currency={"NGN"} />
								</p>
							</span>

							<button className="prev" onClick={PrevS}>
								Prev
							</button>
							<PaystackButton {...componentProps} className="psc__btn" />
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Checkout;
