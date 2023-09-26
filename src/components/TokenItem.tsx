"use client";
import { useBalance } from "wagmi";
import { useEffect, useState } from "react";
import Image from "next/image";

export const TokenItem = ({ token, handleTokenSelection }: any) => {
  const { data: balance }: any = useBalance(token.address);
  const [logoURI, setLogoURI] = useState(token.logoURI);
  useEffect(() => {
    setLogoURI(token.logoURI);
  }, [token.logoURI]);
  const defaultImage = "https://www.svgrepo.com/show/448653/token.svg";
  const handleImageError = () => {
    setLogoURI(defaultImage);
  };

  return (
    <div className="tokenListItem" onClick={() => handleTokenSelection(token)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "",
          gap: "0.5rem",
        }}
      >
        <div>
          <Image
            src={logoURI}
            alt={token.name}
            width={30}
            height={30}
            onError={handleImageError}
            loading="lazy"
            style={{
              borderRadius: "50%",
            }}
          />
        </div>
        <p>{token.name}</p>
      </div>

      <p>{balance}</p>
    </div>
  );
};
