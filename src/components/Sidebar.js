import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { InlineIcon } from "@iconify/react";
import baselineClose from "@iconify/icons-ic/baseline-close";
import { GlobalStateContext } from "../providers/GlobalStateProvider";
import ls from "local-storage";
export const Sidebar = () => {
  const { userAccess, setUserAccess } = useContext(GlobalStateContext);

  if (userAccess === null && ls.get("userAccess") !== null) {
    setUserAccess(ls.get("userAccess"));
  }

  function closeNavigation(e) {
    document.body.classList.remove("menu-open");
    document.querySelector(
      ".layout-main"
    ).style.transform = `translate3D(0, 0, 0)`;
    setTimeout(function() {
      //document.querySelector(".layout-main").style.transform = `none`;
    }, 500);
  }

  return (
    <section className="layout-sidebar">
      <div className="logoMilk">
        <img src="../images/logo.png" alt="Милкком" />
      </div>
      <button
        href="#"
        onClick={e => closeNavigation(e)}
        className="menu-button"
      >
        <InlineIcon icon={baselineClose} />
      </button>

      <nav className="layout-sidebar-navigation">
        {userAccess === "9" && (
          <Link
            to="/register"
            onClick={e => {
              closeNavigation(e);
            }}
          >
            Регистрация
          </Link>
        )}
        {(userAccess === "0" || userAccess === "9") && (
          <Link to="/delivery" onClick={e => closeNavigation(e)}>
            Доставка
          </Link>
        )}
        {(userAccess === "1" || userAccess === "9") && (
          <Link to="/lab" onClick={e => closeNavigation(e)}>
            Лаборатория
          </Link>
        )}
        {(userAccess === "2" || userAccess === "9") && (
          <Link to="/milk" onClick={e => closeNavigation(e)}>
            Цех прясно мляко
          </Link>
        )}
        {(userAccess === "3" || userAccess === "9") && (
          <Link to="/yogurt" onClick={e => closeNavigation(e)}>
            Цех кисело мляко
          </Link>
        )}
        {(userAccess === "4" || userAccess === "9") && (
          <Link to="/whitecheese" onClick={e => closeNavigation(e)}>
            Цех сирене
          </Link>
        )}
        {(userAccess === "5" || userAccess === "9") && (
          <Link to="/yellowcheese" onClick={e => closeNavigation(e)}>
            Цех кашкавал
          </Link>
        )}
        {(userAccess === "6" || userAccess === "9") && (
          <Link to="/salads" onClick={e => closeNavigation(e)}>
            Цех салати
          </Link>
        )}
        {(userAccess === "7" || userAccess === "9") && (
          <Link to="/vakuum" onClick={e => closeNavigation(e)}>
            Вакуум
          </Link>
        )}
        {userAccess && (
          <Link
            to="/login"
            onClick={e => {
              closeNavigation(e);
              ls.remove("userAccess");
              ls.remove("loginCredentials");
              setUserAccess(null);
            }}
          >
            Изход
          </Link>
        )}
        {!userAccess && (
          <>
            <Link
              to="/login"
              onClick={e => {
                closeNavigation(e);
              }}
            >
              Вход
            </Link>
          </>
        )}
      </nav>
    </section>
  );
};
