import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import logo from './images/logo.png';
import simplex from './images/simplex.svg';



function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
        
      <div id="background__Lower">  
      <img id="chalja" src={simplex} 
    
      ></img>

       
      <div id="background__Upper">
      <p style={{ color: "white"}}>
      <i id="hooman" class="fa-solid fa-circle-user fa-2xl mx-2" ></i>      
       Account : {account ? account : "Not connected"}</p>     
         
       
        {!modalOpen && (
        <button className="share button_On_Top" onClick={() => setModalOpen(true)}>
          Share
          <i class="fa-solid fa-paper-plane mx-2"></i>
        </button>       
         )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      
        <div className="App" >
        <img id="logo" src={logo}/>



        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display> 
      </div>
      </div>
      </div>
      </>
  );
}

export default App;
