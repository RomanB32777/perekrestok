import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import LayoutApp from "./containers/LayoutContainer";

// import 'normalize.css';
import "react-notifications-component/dist/theme.css";
import "antd/dist/antd.css";
import 'antd-country-phone-input/dist/index.css';
import "./commonStyles/main.sass";
// import moment from 'moment';
// moment.locale();

function App() {
  return (
    <BrowserRouter>
      <ReactNotifications />
      <LayoutApp />
    </BrowserRouter>
  );
}

export default App;
