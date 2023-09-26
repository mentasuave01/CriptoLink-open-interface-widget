"use client";

const CL_Avatar = () => {
  //load url logo from localstorage
  const logo = localStorage.getItem("logo") || "";

  return (
    <div
      style={{
        // overflow: "hidden",
        height: "100%",
        width: "100%",
        // background: "#8080ff",
      }}
    >
      <img src={logo} className="cryptoLinkAvatar"></img>
    </div>
  );
};

export default CL_Avatar;
