import { ArrowRight } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import Nav from "../Components/Nav";
import Products from "../Components/Products";
import { useStateValue } from "../StateProvider";
import Footer from "../Components/Footer";
import "../Styles/Home.css";
import { useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  increment,
  orderBy,
  query,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";

function Home() {
  let [{ user, featured }, dispatch] = useStateValue();

  //affiliate link for payment of user
  let aff = useParams()?.affiliate;

  useEffect(() => {
    async function updatePeople() {
      if (aff) {
        let userRef = collection(db, "users");

        let pq = query(userRef, where("link", "==", aff));

        let querySnapShotP = await getDocs(pq);

        querySnapShotP.forEach(async (docP) => {
          await updateDoc(doc(userRef, docP.id), {
            people: increment(1),
            earning: increment(0.005),
          })
            .then(() => {
              console.log("updated");
            })
            .catch((err) => {
              console.error(err.message);
            });
        });
      }
    }
    updatePeople();
    async function getFeatured() {
      let featuredRef = collection(db, "store");

      let q = query(
        featuredRef,
        where("featured", "==", true),
        orderBy("category")
      );

      let querySnapShot = await getDocs(q);

      let featuredProducts = [];
      querySnapShot.forEach((doc) => {
        featuredProducts.push({ id: doc.id, ...doc.data() });
      });
      shuffle(featuredProducts);
    }
    getFeatured();
    //product..title
    let productsF = [];
    function shuffle(data) {
      if (data.length > 0) {
        data.forEach((item) => {
          let category = item.category;

          if (productsF.length > 0) {
            for (let i = 0; i < productsF.length; i++) {
              if (productsF[i].title === category) {
                productsF[i].items = [...productsF[i].items, item];
                break;
              } else if (i === productsF.length - 1) {
                productsF.push({ title: category, items: [item] });
                break;
              }
            }
          } else {
            productsF.push({ title: category, items: [item] });
          }
        });
        dispatch({
          type: "FEATURED",
          featured: productsF,
        });
      }
      //console.log(productsF);
    }
  }, [dispatch, aff]);

  return (
    <div>
      <Nav />
      <div className="hbg">
        <div className="ts">
          <h1 style={{ color: "#fff" }}>All exciting offers in one place</h1>
          <p>
            Get everything you want in want place, fast pace and at great price
          </p>
          <Link to="/shop">
            Explore Shop <ArrowRight />
          </Link>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/bigstore-70bec.appspot.com/o/Images%2Fshopping.png?alt=media&token=d4997544-a9c0-4a1b-9574-2f76f9a6b85d"
          alt="shopping girl"
        />
      </div>
      <div>
        <Products data={featured} />
      </div>
      {Object.keys(user).length === 0 && (
        <div className="pxl">
          <p>Sign in for personalized recommendations</p>
          <Link to="/login">Login</Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
