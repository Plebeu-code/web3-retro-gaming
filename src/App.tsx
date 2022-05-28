import { useState } from "react";
import "./style/home.scss";
import detectEthereumProvider from '@metamask/detect-provider'

function App() {
  detectEthereumProvider()
  const [validSession, setValidSession] = useState(false);
  const [walletAdress, setWalletAdress] = useState("");
  const [acccounts, setAccounts] = useState([]);

  const { ethereum } = window as any;

  const validateWallet = async () => {

    if (!validSession)
    return alert("Conta não conectada. Por favor, conecte-se a uma conta para continuar.");
    
    const walletResponse = await connectWallet();
    setValidSession(walletResponse.ConnectedStatus);
    setWalletAdress(walletResponse.status);
  };

  const connectWallet = async () => {
    if (ethereum) {
      try {
        const address = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const requestObject = {
          ConnectedStatus: true,
          status: "Conectado com sucesso",
          address,
        };

        return requestObject;
      } catch (err) {
        return {
          ConnectedStatus: false,
          status: "Erro ao conectar a metamask",
        };
      }
    } else {
      return {
        ConnectedStatus: false,
        status: "Metamask não instalada!",
      };
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img
            src="https://cdn.discordapp.com/icons/801993994283778059/ea2d1fe779833f8df9f2bd46326de6af.png?size=2048"
            alt=""
          />
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Sobre nós</li>
            <li onClick={validateWallet}>Conectar</li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <section>
          <div className="text-nft">
            <h1>BigBigode</h1>
            <p>
              COMPRE AGORA MESMO NA PRÉ VENDA O BIGBIGODE, TENHA UM BIGODE DE
              QUALIDADE, NÃO PERCA ESSA OPORTUNIDADE.
            </p>
          </div>
          <div className="button-mint">
            <button>-</button>
            <input type="number" />
            <button>+</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
