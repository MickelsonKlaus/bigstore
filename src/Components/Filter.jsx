import { useState } from "react";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Filter() {
	let [min, setMin] = useState(1000);
	let [max, setMax] = useState(100000);

	function setLeftValue(e) {
		let inptRight = document.getElementById("inpt__right");
		let thumbLeft = document.querySelector(".thumb.left");
		let range = document.querySelector(".range");

		let minL = parseInt(e.target.min),
			maxL = parseInt(e.target.max);

		e.target.value = Math.min(
			parseInt(e.target.value),
			parseInt(inptRight.value)
		);

		setMin(e.target.value);

		let percent = ((e.target.value - minL) / (maxL - minL)) * 100;

		thumbLeft.style.left = percent + "%";
		range.style.left = percent + "%";
	}

	function setRightValue(e) {
		let inptLeft = document.getElementById("inpt__left");
		let thumbRight = document.querySelector(".thumb.right");
		let range = document.querySelector(".range");

		let minL = parseInt(e.target.min),
			maxL = parseInt(e.target.max);

		e.target.value = Math.max(
			parseInt(e.target.value),
			parseInt(inptLeft.value)
		);

		setMax(e.target.value);

		let percent = ((e.target.value - minL) / (maxL - minL)) * 100;

		thumbRight.style.right = 100 - percent + "%";
		range.style.right = 100 - percent + "%";
	}
	let check = (e) => {
		if (e.target.checked) {
			e.target.nextElementSibling.classList.add("selected");
		} else {
			e.target.nextElementSibling.classList.remove("selected");
		}
	};

	let close = () => {
		let flt = document.querySelector(".flt__opts");

		flt.style.display = "none";
	};

	let opn = () => {
		let flt = document.querySelector(".flt__opts");

		flt.style.display = "block";
	};
	return (
		<>
			<div className="flt__opts">
				<div>
					<HighlightOffIcon className="close" onClick={close} />
					<h3>Categories</h3>
					<ul>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							Men
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							Womem
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>{" "}
							Kids
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							Fashion
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							Kitchen
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							Others
						</li>
					</ul>
				</div>
				<div>
					<h3>Price</h3>
					<div className="mlt__range__slider">
						<input
							type="range"
							name="slider"
							id="inpt__left"
							min="0"
							max="100000"
							value={min}
							onInput={(e) => setLeftValue(e)}
						/>
						<input
							type="range"
							name="slider"
							id="inpt__right"
							min="0"
							max="100000"
							value={max}
							onInput={(e) => setRightValue(e)}
						/>
						<div className="slider">
							<div className="track"></div>
							<div className="range"></div>
							<div className="thumb left"></div>
							<div className="thumb right"></div>
						</div>
					</div>
					<div className="vals">
						<h4>{min}</h4>
						<h4>{max}</h4>
					</div>
				</div>
				<div>
					<h3>Discount</h3>{" "}
					<ul>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							Free
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							-10%
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							-20%
						</li>
						<li>
							<span className="checkboxC">
								<input
									type="checkbox"
									name="selected"
									className="cb"
									onChange={(e) => check(e)}
								/>
								<span className="cbs">
									<span className="mark"></span>
								</span>
							</span>
							-50%
						</li>
					</ul>
				</div>
				<button>Apply</button>
			</div>
			<button
				className="flt"
				style={{
					display: "none",
					alignItems: "center",
					justifyContent: "flex-start",
					position: "fixed",
					bottom: "20px",
					right: "20px",
					background: "var(--primary)",
					padding: "8px 20px",
					color: "white",
					border: "2px solid white",
					outline: "none",
					borderRadius: "10px",
					cursor: "pointer",
				}}
				onClick={opn}
			>
				<SortOutlinedIcon style={{ marginRight: "5px" }} /> Filter
			</button>
			;
		</>
	);
}

export default Filter;
