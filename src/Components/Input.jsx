function Input({
	id,
	label,
	type,
	name,
	placeholder,
	handleChange = () => {},
	value = "",
	min = "",
	max = "",
	classN = "",
	m = 0,
	required = true,
}) {
	return (
		<>
			<label htmlFor={id}>
				{label}
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					defaultValue={value}
					id={id}
					onChange={(e) => {
						handleChange(e);
					}}
					min={m}
					minLength={min}
					maxLength={max}
					required={required}
					className={classN}
				/>
			</label>
		</>
	);
}

export default Input;
