import "./index.css";

const Header = ({ stepOne, stepTwo, stepThree }) => (
  <div className="Header">
    <button className="stetOne">Step 1</button>
    <button className={stepTwo ? "stepTwo" : ""}>Step 2</button>
    <button className={stepThree ? "stepThree" : ""}>Step 3</button>
  </div>
);

export default Header;