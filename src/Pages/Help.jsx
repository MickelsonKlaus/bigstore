import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import "../Styles/Help.css";

function Help() {
	let customer = [
		{
			title: "Product help",
			text: "Get product support on purchased goods or services",
		},
		{
			title: "Report issues",
			text: "Having issues with any of our serivices or dissatisfied? get help.",
		},
		{
			title: "Track orders",
			text: "Get to know where your goods are. Location and delivery informations.",
		},
		{
			title: "Support us",
			text: "You can also support us by investing, sending feedbacks and reporting issues.",
		},
	];
	return (
		<div>
			<Nav />
			<div className="help">
				<h1>Customer's Support (coming soon)</h1>
				<div className="cc">
					{customer.map((item, index) => {
						return <Card key={index} h={item} />;
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Help;
