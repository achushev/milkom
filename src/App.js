import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import {GlobalStateProvider} from "./providers/GlobalStateProvider";
import { GlobalStylesProvider } from "./providers/GlobalStylesProvider";
import { ProtectedRoute } from './components/ProtectedRoute'
import { Footer } from "./components/Footer";
import { Login } from "./pages/Login";
import { LabForm } from "./pages/LabForm";
import { DeliveryForm } from "./pages/DeliveryForm";
import { NotFound } from "./pages/NotFound";
import { MilkForm } from "./pages/MilkForm";
import "./styles/app.scss";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import { InlineIcon } from "@iconify/react";
import baselineMenu from "@iconify/icons-ic/baseline-menu";
import baselineArrowBackIos from "@iconify/icons-ic/baseline-arrow-back-ios";
import baselineClose from "@iconify/icons-ic/baseline-close";
import { PageTitle } from "./components/PageTitle";
import { WhiteCheeseForm } from "./pages/WhiteCheeseForm";
import { YogurtForm } from "./pages/YogurtForm";
import { YellowCheeseForm } from "./pages/YellowCheeseForm";
import { SaladsForm } from "./pages/SaladsForm";

export const App = () => {
  //const { isLogged } = useContext(GlobalStateContext)

  function showNavigation(e) {
    e.preventDefault();
    document.body.classList.add("menu-open");
    document.querySelector(
      ".layout-main"
    ).style.transform = `translate3D(250px, 100px, 0)`;
  }

  function closeNavigation(e) {
    document.body.classList.remove("menu-open");
    document.querySelector(
      ".layout-main"
    ).style.transform = `translate3D(0, 0, 0)`;
    setTimeout(function() {
      document.querySelector(".layout-main").style.transform = `none`;
    }, 500);
  }

  return (
    <GlobalStateProvider>
      <GlobalStylesProvider>
        <Router>
          <section className="layout-sidebar">
            <button
              href="#"
              onClick={e => closeNavigation(e)}
              className="menu-button"
            >
              <InlineIcon icon={baselineClose} />
            </button>

            <nav className="layout-sidebar-navigation">
              <Link to="/delivery" onClick={e => closeNavigation(e)}>
                Доставка
              </Link>
              <Link to="/lab" onClick={e => closeNavigation(e)}>
                Лаборатория
              </Link>
              <Link to="/milk" onClick={e => closeNavigation(e)}>
                Цех прясно мляко
              </Link>
              <Link to="/yogurt" onClick={e => closeNavigation(e)}>
                Цех кисело мляко
              </Link>
              <Link to="/whitecheese" onClick={e => closeNavigation(e)}>
                Цех сирене
              </Link>
              <Link to="/yellowcheese" onClick={e => closeNavigation(e)}>
                Цех кашкавал
              </Link>
              <Link to="/salads" onClick={e => closeNavigation(e)}>
                Цех салати
              </Link>
            </nav>
          </section>
          <header className="layout-header">
            <button
                onClick={e => showNavigation(e)}
                className="menu-button icon-menu"
            >
              <InlineIcon icon={baselineMenu} />
            </button>

            <button
                href="#"
                onClick={e => closeNavigation(e)}
                className="menu-button icon-back"
            >
              <InlineIcon icon={baselineArrowBackIos} />
            </button>
            <PageTitle />
          </header>
          <main className="layout-main">
            <section className="layout-main-wrapper">
              <Switch>
                <Route path="/" exact component={Login} />
                <ProtectedRoute path="/delivery" exact component={DeliveryForm} />
                <ProtectedRoute path="/lab" exact component={LabForm} />
                <ProtectedRoute path="/milk" exact component={MilkForm} />
                <ProtectedRoute path="/whitecheese" exact component={WhiteCheeseForm} />
                <ProtectedRoute path="/yogurt" exact component={YogurtForm} />
                <ProtectedRoute path="/salads" exact component={SaladsForm} />
                <ProtectedRoute
                  path="/yellowcheese"
                  exact
                  component={YellowCheeseForm}
                />
                <Route component={NotFound} />
              </Switch>
            </section>
          </main>

          <Footer />
        </Router>
      </GlobalStylesProvider>
    </GlobalStateProvider>
  );
};
