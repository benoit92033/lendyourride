import { HashLink as Link } from "react-router-hash-link";
import "./Footer.style.css"

export const Footer = () => {
  return (
    <>
      <div className="footer">
         <ul> Legal 
            <li><Link to="/legal/CGU">CGU</Link></li>
        </ul> 
      </div>
    </>
  );
};
