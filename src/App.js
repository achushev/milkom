import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStateProvider } from "./providers/GlobalStateProvider";
import { GlobalStylesProvider } from "./providers/GlobalStylesProvider";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { LabForm } from "./pages/LabForm";
import { DeliveryForm } from "./pages/DeliveryForm";
import { NotFound } from "./pages/NotFound";
import { MilkForm } from "./pages/MilkForm";
import "./styles/app.scss";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";

export const App = () => {
  return (
    <GlobalStateProvider>
      <GlobalStylesProvider>
        <Router>
          <Sidebar />
          <main className="layout-main">
            <Header />
            <section className="layout-main-wrapper">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/lab" exact component={LabForm} />
                <Route path="/milk" exact component={MilkForm} />
                <Route path="/delivery" exact component={DeliveryForm} />
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
