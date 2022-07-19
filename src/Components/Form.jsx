import Input from "./Input";

function Form({ details, bt, handleChange, next }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		next();
	};

	return (
		<form onSubmit={handleSubmit}>
			{details.map((detail, index) => {
				return (
					<Input
						key={index}
						id={detail.id}
						label={detail.label}
						type={detail.type}
						name={detail.name}
						placeholder={detail.placeholder}
						handleChange={handleChange}
					/>
				);
			})}
			{bt === true ? <button className="next">Next</button> : ""}
		</form>
	);
}

export default Form;
