import "./alert.css";
interface SucessProps {
  close: () => void;
  explorerURL: string;
}

export default function Sucess({ close, explorerURL }: SucessProps) {
  return (
    <>
      <div id="container">
        <div id="success-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth happy"></div>
          </div>
          <div className="shadow scale"></div>
          <div className="message">
            <h1 className="alert">Success!</h1>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`${explorerURL}`}
              id="txLink"
            >{`${explorerURL}`}</a>
          </div>
          <button className="button-box" onClick={() => close()}>
            <h1 className="green">continue</h1>
          </button>
        </div>
      </div>
    </>
  );
}
