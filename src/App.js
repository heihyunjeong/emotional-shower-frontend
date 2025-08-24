import { BrowserRouter } from "react-router-dom";

import Header from "./Components/app/Header"
import Nav from "./Components/app/Nav"
import Main from "./Components/app/Main"
import Footer from "./Components/app/Footer"
import RecoilAuthProvider from "./Components/context/RecoilAuthProvider"
import AuthProvider from "./Components/context/AuthProvider"  // 추가!
import HttpHeadersProvider from "./Components/context/HttpHeadersProvider";
import "./css/style.css"
import "./css/main.css"

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>  {/* AuthProvider 추가! */}
          <RecoilAuthProvider>
            <HttpHeadersProvider>
              <Header />
              {/* <Nav /> */}
              <Main />
              <Footer />
            </HttpHeadersProvider>
          </RecoilAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;