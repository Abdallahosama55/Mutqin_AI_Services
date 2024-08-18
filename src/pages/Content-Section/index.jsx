import React, { useEffect } from "react";
import { cards } from "./data";
import Logo from "@/assets/Images/common/Logo";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/helpers/constants";
import { setTitle } from "@/redux/api/apiSlice";
import { useDispatch } from "react-redux";
function ContentSection() {
  const dispatch = useDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const navigate = useNavigate(); // Usa useNavigate al posto di useHistory
  useEffect(() => {
    dispatch(setTitle("مساعد متقن"));
  }, []);

  return (
    <div className={styles.container}>
      <div
        className="text-center"
        style={{
          marginBottom: "48px",
        }}
      >
        <Logo scale={breakpoint === "mobile" ? 0.5 : 1} />
        <h3
          className={styles.header}
          style={{
            fontSize: breakpoint === "mobile" ? "20px" : "24px",
          }}
        >
          مساحة عمل الذكاء الاصطناعي الشخصية الخاصة بك !
        </h3>
      </div>
      <div className="container">
        <div
          className={
            styles.cardContainer +
            " row justify-content-center items-center m-auto "
          }
        >
          {cards.map((card, index) => (
            <div
              // to={`/add-ads/${card.slug}`}
              onClick={() => {
                navigate(`/add-ads/${card.slug}`); // Naviga senza ricaricare la pagina

                dispatch(setTitle(card.title));
              }}
              key={index + card.title}
              className={styles.card + " col-md-4"}
              style={{
                cursor: "pointer",
              }}
            >
              <div className={styles.cardImage}>{card.image}</div>
              <div>
                <h5 className={styles.title}>{card.title}</h5>
                <p className={styles.description}>{card.description}</p>
              </div>
            </div>
          ))}
          <div className={styles.card + " col-md-4 invisible"}></div>
        </div>
      </div>
    </div>
  );
}

export default ContentSection;
