export const initialState = {
	cart: [],
	user: {},
	receipt: [],
	product: {},
	payments: [],
	featured: [],
	store: [],
	recents: [],
	products: [],
	category: [],
	tp: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "ATB":
			if (state.cart.length > 0) {
				state.cart.forEach((item, index) => {
					if (item.id === action.item.id) {
						item.quantity = item.quantity + 1;
					} else if (
						item.id !== action.item.id &&
						index === state.cart.length - 1
					) {
						state.cart = [...state.cart, action.item];
					}
				});

				return {
					...state,
					cart: [...state.cart],
				};
			}
			return {
				...state,
				cart: [...state.cart, action.item],
			};

		case "INC":
			state.cart.forEach((item) => {
				if (item.id === action.id) {
					item.quantity += 1;
				}
			});

			return {
				...state,
				cart: [...state.cart],
			};

		case "DC":
			state.cart.forEach((item) => {
				if (item.id === action.id) {
					if (item.quantity === 1) {
						remove(action.id);
					} else {
						item.quantity -= 1;
					}
				}
			});
			return {
				...state,
				cart: [...state.cart],
			};

		case "NQ":
			state.cart.forEach((item) => {
				if (item.id === action.id) {
					item.quantity = action.nq;
				}
			});

			return {
				...state,
				cart: [...state.cart],
			};

		case "REMOVE":
			let Rcart = [];
			state.cart.forEach((item) => {
				if (item.id !== action.id) {
					return Rcart.push(item);
				}
			});

			return {
				...state,
				cart: [...Rcart],
			};

		case "RECEIPT":
			return {
				...state,
				receipt: [...state.cart],
				cart: [],
			};

		case "LOGGED":
			return {
				...state,
				user: { ...action.user },
				cart: [...state.cart],
			};
		case "PROD":
			return {
				...state,
				product: { ...action.item },
			};
		case "PP":
			let itm = {};
			state.products.forEach((item) => {
				item.others.forEach((it) => {
					if (it.id === action.id) itm = { ...it };
				});
			});

			return { ...state, product: { ...itm } };
		case "LNK":
			state.user.link = action.link;
			return {
				...state,
				user: { ...state.user },
			};
		case "USN":
			state.user.username = action.username;
			return {
				...state,
				user: { ...state.user },
			};
		case "USP":
			state.user.profilePic = action.profilePic;
			return {
				...state,
				user: { ...state.user },
			};
		case "DEL":
			return {
				...state,
				user: {},
				payments: [],
				store: [],
			};
		case "OD":
			state.user.orders = action.od.orders;
			state.user.delivering = action.od.delivering;
			return {
				...state,
				user: { ...state.user },
			};
		case "POD":
			return {
				...state,
				payments: action.payments,
				store: action.store,
			};
		case "FEATURED":
			return {
				...state,
				featured: action.featured,
			};
		case "PRODUCTS":
			return {
				...state,
				products: action.products,
			};
		case "CATE":
			return {
				...state,
				category: action.cate,
			};
		default:
			return state;
	}
	function remove(id) {
		let Ecart = [];
		state.cart.forEach((item) => {
			if (item.id !== id) {
				return Ecart.push(item);
			}
		});

		state.cart = [...Ecart];

		return {
			...state,
			cart: [...state.cart],
		};
	}
};

export default reducer;
