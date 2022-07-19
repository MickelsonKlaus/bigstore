import { Navigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";

export default function PrivateRoute({ children: Element }) {
	let [{ user }] = useStateValue();

	return Object.keys(user).length > 0 ? (
		Element
	) : (
		<Navigate to="/login" replace={true} />
	);
}
