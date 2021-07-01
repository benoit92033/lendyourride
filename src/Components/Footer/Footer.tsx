import { Footer } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import "./Footer.style.css"

export const MyFooter = () => {
  return (
    <>
      <Footer className="footer">
        <Link to="/legal/CGU">CGU</Link>
      </Footer>
    </>
  );
};
