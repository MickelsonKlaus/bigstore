import { Link } from "react-router-dom";
import CurrencyFormatter from "react-currency-formatter";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useStateValue } from "../StateProvider";
import "../Styles/Cart.css";

function Item({ item }) {
  let { id, img, name, price, slash, quantity } = item;

  let [, dispatch] = useStateValue();

  const handleChange = (event) => {
    dispatch({
      type: "NQ",
      id: id,
      nq: event.target.value,
    });
  };

  const inc = () => {
    dispatch({
      type: "INC",
      id: id,
    });
  };

  const dc = () => {
    dispatch({
      type: "DC",
      id: id,
    });
  };

  const remove = () => {
    dispatch({
      type: "REMOVE",
      id: id,
    });
  };

  return (
    <div className="crt__item" id={id}>
      <Link to={`./shop/product?id=${id}`}>
        <img src={img} alt={name} />
      </Link>
      <div>
        <h3>{name}</h3>
        <span className="sp">
          {slash === 0 ? (
            <p>
              Price:&nbsp;
              {price === 0 ? (
                "free"
              ) : (
                <CurrencyFormatter quantity={price} currency={"NGN"} />
              )}
            </p>
          ) : (
            <>
              <p className="crt__slash">
                Price:&nbsp;
                <CurrencyFormatter quantity={price} currency={"NGN"} />
              </p>
              <p>
                Slash:&nbsp;
                <CurrencyFormatter quantity={slash} currency={"NGN"} />
              </p>
            </>
          )}
        </span>
        <span className="crt__idq">
          <RemoveRoundedIcon className="crt__inc" onClick={dc} />
          <Select
            id="demo-simple-select-autowidth"
            value={quantity}
            onChange={handleChange}
            autoWidth
            className="crt__select"
            sx={{
              border: 0,
            }}
          >
            {Array(5 + quantity)
              .fill()
              .map((_, i) => {
                return (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                );
              })}
          </Select>
          <AddOutlinedIcon className="crt__dc" onClick={inc} />
        </span>
        <button onClick={remove}>Remove</button>
      </div>
    </div>
  );
}

export default Item;
