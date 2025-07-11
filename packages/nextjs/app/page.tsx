"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import WriteComponent from "~~/components/WriteComponent";
import { Address, Balance } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress, chainId } = useAccount();

  return (
    <>
      <div className="">Hola Mundo</div>
      Direccion:
      <Address address={connectedAddress}></Address>
      Balance:
      <Balance address={connectedAddress}></Balance>
      Chain
      <p>{chainId}</p>
      <WriteComponent></WriteComponent>
    </>
  );
};

export default Home;
