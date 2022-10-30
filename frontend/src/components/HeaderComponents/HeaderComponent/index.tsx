import { Col, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import clsx from "clsx";
import Logo from "../LogoComponent";
import { filterVacancy } from "../../../consts";
import { MenuMobileIcon } from "../../../icons/icons";
import "./styles.sass";

interface IHeaderComponent {
  visibleLogo?: boolean;
  logoUrl?: string;
  visibleGamburger?: boolean;
  hidden?: boolean;
  modificator?: string;
  backgroundColor?: string;
  collapsedSidebar?: boolean;
  children?: React.ReactNode;
  setCollapsedSidebar?: (status: boolean) => void;
  onClick?: () => void;
}

const HeaderComponent = ({
  hidden,
  visibleLogo,
  visibleGamburger,
  logoUrl,
  modificator,
  backgroundColor,
  collapsedSidebar,
  children,
  setCollapsedSidebar,
  onClick,
}: IHeaderComponent) => {
  return (
    <>
      <Header
        className={clsx("site-layout-background", {
          [modificator as string]: modificator,
        })}
        hidden={hidden}
        onClick={onClick}
        style={{
          background: backgroundColor,
        }}
      >
        <div className="container header-container">
          <Row
            justify="center" //space-between
            align="middle"
            className="header-container-row"
          >
            {visibleGamburger && (
              <div
                className={clsx("gamb-icon", {
                  active: !collapsedSidebar,
                })}
                onClick={() =>
                  setCollapsedSidebar && setCollapsedSidebar(!collapsedSidebar)
                }
              >
                <MenuMobileIcon />
              </div>
            )}
            {visibleLogo && (
              <Col
                lg={{ span: filterVacancy ? 8 : 24 }}
                xs={{ span: filterVacancy ? 14 : 24 }}
              >
                <div
                  className={clsx("header__left", {
                    "only-logo": !filterVacancy,
                  })}
                >
                  <Logo navigateUrl={logoUrl || "/"} />
                </div>
              </Col>
            )}
            {filterVacancy && (
              <Col xs={!visibleLogo ? 24 : 8}>
                <div className="header__right">{children}</div>
              </Col>
            )}
          </Row>
        </div>
      </Header>
    </>
  );
};

export default HeaderComponent;
