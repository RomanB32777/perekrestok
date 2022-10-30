import { useNavigate } from "react-router";
// import mainLogo from "../../../assets/logo.png";
import mainLogo from "../../../assets/logo-mini.png";
import "./styles.sass";

const Logo = ({ navigateUrl }: { navigateUrl: string }) => {
  const navigate = useNavigate();
  return (
    <div className="main-logo mini" onClick={() => navigate(navigateUrl)}>
      <img src={mainLogo} alt="logo" />
    </div>
  );
};

export default Logo;
