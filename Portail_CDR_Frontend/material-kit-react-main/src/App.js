import React, { useContext, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ContactUs from "pages/LandingPages/ContactUs";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import ListViewItem from "pages/Controle/ListView";
import ListViewItems from "pages/Controle/ListViews";
import ListViewControleItem from "pages/Controle/ListViewControle";
import RadioCards from "pages/Controle/FluxOaView";
import Page from "pages/Charts/Auditlp318";
import AuditDoublonsIPAddress from "pages/Charts/AuditDoublonsIPAddress"
import AuditCSG from "pages/Charts/AuditCsg";
import AuditAtrGlobal from "pages/Charts/AuditAtrGlobal";
import PageCsgPtn from "pages/Charts/Auditlp318csgptnfh";
import PageCsgFhCsg from "pages/Charts/Auditlp318csgfhcsg";
import PageCsgPtnFtta from "pages/Charts/Auditlp318csgptnftta";
import PageCsgCsgFtta from "pages/Charts/Auditlp318csgcsgftta";
import PageCsgCtrFtta from "pages/Charts/Auditlp318csgctrftta";
import GlobalCsg from "pages/Charts/GlobalCsg";
import AuditCsgGlobal from "pages/Charts/AuditCsgGlobal";
import SignInBasic from "pages/LandingPages/SignIn";
import Protected from "Protected/Protected";
import Author from "pages/LandingPages/Author";
import PageLp71_2 from "pages/Charts/Auditlp71_2";
import { AuthContext } from "AuthContext/AuthContext";
import NewPageIpFh from "pages/Charts/newAuditIpFh";
import PageLp71_2_Csg from "pages/Charts/Auditlp71_2_csg";
const App = () => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
            {/* Single route using a parameter :architecture */}
            <Route
              path="/audit/:architecture"
              element={
                // <Protected isSignedIn={isSignedIn}>
                  <AuditCSG />
                // </Protected>
              }
            />
            <Route
              path="/audit/chartDoublonIpFH"
              element={
                // <Protected isSignedIn={isSignedIn}>
                  <AuditDoublonsIPAddress />
                // </Protected>
              }
            />            
             <Route
              path="/audit/csg/global"
              element={
                // <Protected isSignedIn={isSignedIn}>
                  <AuditCsgGlobal />
                // </Protected>
              }
            />
            <Route
              path="/audit/atr/global"
              element={
                // <Protected isSignedIn={isSignedIn}>
                  <AuditAtrGlobal />
                // </Protected>
              }
            />
          </Routes>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route
            path="/presentation"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <Presentation />
              // </Protected>
            }
          />
          <Route
            path="/catalogue"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <ListViewItems />
              // </Protected>
            }
          />
          
          <Route
            path="/contact"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <ContactUs />
              // </Protected>
            }
          />
          <Route
            path="/controle"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <ListViewControleItem />
              // </Protected>
            }
          />
          <Route
            path="/controle/lp71_2"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <PageLp71_2 />
              // </Protected>
            }
          />
          <Route
            path="/controle/lp71_2_csg"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <PageLp71_2_Csg />
              // </Protected>
            }
          />
          <Route
            path="/chart"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <Page />
              // </Protected>
            }
          />
         
          <Route
            path="/chartcsgptn"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <PageCsgPtn />
              // </Protected>
            }
          />
          <Route
            path="/chartcsgfhcsg"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <PageCsgFhCsg />
              // </Protected>
            }
          />
          <Route
            path="/chartcsgptnftta"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <PageCsgPtnFtta />
              // </Protected>
            }
          />
          <Route
            path="/chartcsgcsgftta"
            element={
              <Protected isSignedIn={isSignedIn}>
                <PageCsgCsgFtta />
              </Protected>
            }
          />
          <Route
            path="/chartcsgctrftta"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <PageCsgCtrFtta />
              // </Protected>
            }
          />

          <Route
            path="/chartFh"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <NewPageIpFh />
              // </Protected>
            }
          />
          <Route
            path="/fluxoaradio"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <RadioCards />
              // </Protected>
            }
          />
          <Route
            path="/globalcsg"
            element={
              // <Protected isSignedIn={isSignedIn}>
                <GlobalCsg />
              // </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
