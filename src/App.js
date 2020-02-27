import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStateProvider } from "./providers/GlobalStateProvider";
import { GlobalStylesProvider } from "./providers/GlobalStylesProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
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
import { PageTitle } from "./components/PageTitle";
import { WhiteCheeseForm } from "./pages/WhiteCheeseForm";
import { YogurtForm } from "./pages/YogurtForm";
import { YellowCheeseForm } from "./pages/YellowCheeseForm";
import { SaladsForm } from "./pages/SaladsForm";
import { Vakuum } from "./pages/Vakuum";

export const App = () => {
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
          <Sidebar />
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
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />

                <ProtectedRoute
                  path="/delivery"
                  accessLevel={0}
                  exact
                  component={DeliveryForm}
                />
                <ProtectedRoute
                  path="/lab"
                  accessLevel={1}
                  exact
                  component={LabForm}
                />
                <ProtectedRoute
                  path="/milk"
                  accessLevel={2}
                  exact
                  component={MilkForm}
                />
                <ProtectedRoute
                  path="/yogurt"
                  accessLevel={3}
                  exact
                  component={YogurtForm}
                />
                <ProtectedRoute
                  path="/whitecheese"
                  accessLevel={4}
                  exact
                  component={WhiteCheeseForm}
                />
                <ProtectedRoute
                  path="/yellowcheese"
                  accessLevel={5}
                  exact
                  component={YellowCheeseForm}
                />
                <ProtectedRoute
                  path="/salads"
                  accessLevel={6}
                  exact
                  component={SaladsForm}
                />
                <ProtectedRoute
                  path="/vakuum"
                  accessLevel={7}
                  exact
                  component={Vakuum}
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
