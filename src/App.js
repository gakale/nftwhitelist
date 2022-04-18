import  {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import InfosAccount from './components/InfosAccount';
import AddWhiteList from "./components/AddWhitList";
import firebase from "./Firebase";
import './App.css';
import {getBalances} from "@ethereum-waffle/chai/dist/esm/matchers/misc/balance";
const ref = firebase.firestore().collection('whitelist');

function App() {

    // on recupère le nombre de personne dans la whiteliste
    const [countData, setCountData]=useState(0);
    // cela va permet si l'utisateur viens sur le site cela va charger afin de recupéré les éléments
    const [loader, setLoader] = useState(true);
    // on va recupéré tous les compte de l'utilsateur puis les stocker dans un tableau
    const [accounts , SetAccounts] = useState([]);
    // on va recurécupé le nombre d'ether que l'utilisateur posséde sur son compte
    const [balance , setBalance] = useState();
    //on affiche les message de success ou d'erreur si l'utilisateur parviens a se connecté a la whiteliste
    const [succes , setSucces]= useState('');
    // on repère les érreurs aussi s'il a un souci pour afficher a l'utilisateur
    const [error , setError] = useState('');

// quand les composant de la page seront charger on va lancé la fonction getAccounts
    useEffect(()=>{
        getAccounts();
        setLoader(false);
        getCount();
    },[])
    // si l'utilisateur est connecte on recupere les comptes
    window.ethereum.addListener('connect',async(reponse)=>{
        getAccounts();
    })
    // quand l'utilisateur change de comptes on actualise la page
    window.ethereum.on('accountsChanged', ()=>{
        window.location.reload();
    })
    // si l'utilisateur est connecte sur notre site et il change de reseau on actualise la page

    window.ethereum.on('chainChanged', ()=>{
        window.location.reload();
    })
    // si l'utilisateur se deconecte de la page on va faire aussi une actualisation
    window.ethereum.on('disconnect',()=>{
        window.location.reload();
    })

    // on recupere le nombre d'utilisateur dans la base de donner

    function getCount(){
        ref.get().then(function (querySnapshot) {
            setCountData(querySnapshot.size);

        })
    }

    // connectons l'utilisateur et recuperons la liste des comptes connecté de l'utilisateur
    async  function getAccounts() {
        // si la personne possede un truck comme wallet
        if (typeof window.ethereum !== 'undefined'){
            let accounts = await window.ethereum.request({method : 'eth_requestAccounts'});
            SetAccounts(accounts);
            // recupéré la balance de l'utilisateur connecté
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(accounts[0]);
            // recupéré la balance en eth
            const  balanceInEth = ethers.utils.formatEther(balance);
            setBalance(balanceInEth);
        }

    }


  return (
    <div className="App">
        {error && <p className="alert error">{error} </p>}
        {succes && <p className="alert succes">{succes}</p>}
         <InfosAccount accounts={accounts} balance={balance} loader={loader}/>
         <AddWhiteList account={accounts} countData={countData} setCountData={setCountData} getCount={getCount} balance={balance}
            setBalance={setBalance} setError={setError} setSucces={setSucces}
         />
    </div>
  )
}
export {ref}
export default App;
