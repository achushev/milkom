import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStateProvider } from "./providers/GlobalStateProvider";
import { GlobalStylesProvider } from "./providers/GlobalStylesProvider";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { FormExample } from "./pages/FormExample";
import { FormDelivery } from "./pages/FormDelivery";
import { NotFound } from "./pages/NotFound";
import "./styles/app.scss";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";


export const App = () => {

  return (
    <GlobalStateProvider>
      <GlobalStylesProvider>
        <Router>
          <Sidebar/>
          <main className="layout-main">
            <Header/>
            <section className="layout-main-wrapper">
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/formexample" exact component={FormExample}/>
                <Route path="/delivery" exact component={FormDelivery}/>
                <Route component={NotFound}/>
              </Switch>
            </section>
          </main>

          <Footer/>
        </Router>
      </GlobalStylesProvider>
    </GlobalStateProvider>
  );
};
