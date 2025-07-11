import React, { useState } from "react";
//import {useState} from  "react"
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const WriteComponent = () => {
  const { writeContractAsync, isPending } = useScaffoldWriteContract("YourContract");
  const [newGreeting, setNewGreeting] = React.useState("");
  const [output, setOutput] = useState("");

  const handleSetGreeting = async () => {
    try {
      await writeContractAsync(
        {
          functionName: "setGreeting",
          args: [newGreeting],
          value: parseEther("0.01"),
        },
        {
          onBlockConfirmation: txnReceipt => {
            setOutput(txnReceipt.transactionHash);
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Write your greeting"
        className="input border border-primary"
        onChange={e => setNewGreeting(e.target.value)}
      />
      <p>{output}</p>
      <button className="btn btn-primary" onClick={handleSetGreeting} disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
      </button>
    </>
  );
};

export default WriteComponent;
