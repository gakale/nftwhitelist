import {useEffect , useState} from "react";
import {v4 as uuidv4} from "uuid";
import firebase from "firebase";

import {ref} from "./../App";

function Admin(){
    const [email, setEmail] = useState('');
    const [password , setPassword]= useState('');
    const [logger, setLogger] = useState(false);
    // on va recupeéré les donner de base de donner
    const [data , setData] = useState([]);
    // on verifie est-ce qu'on a pue recupéré les données de la base de donner
    const [loaded,setLoaded]=useState(false);
    const [address , setAddress]= useState('');
    const  [succes , setSucces]=useState('')
    const  [error , setError]=useState('')

useEffect(()=>{
    // l'orsqu'on arrive sur la page et que le state data a changer on meets le setloaded a true

        setLoaded(true);
    },[data])

    function loggin(){
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((userCredential)=>{
                setLogger(true);
                //on recupère les données quand on est logger
               getData();

            }).catch((error)=>{
                console.log('non');
        })
    }

    // creation d'une fonction qui permet de recupéré les données dans la base de donnéer

    function getData(){
        ref.onSnapshot((querySnapshot)=>{
            const  items = [];
            querySnapshot.forEach((doc)=>{
              items.push(doc.data());
            })
            setData(items);
        })
    }
    //supprimé un utilisateur a la whitelist
function deleteAddress(e){
    ref.doc(e.target.value).delete();
}

// ajoutter un utilisateur a la whiteliste
function AddOnWhitelist(){
    let balance = 0;
    let id = uuidv4();
    let obj = {
        address : address,
        id : id,
        balance : balance
    }
    //ajouter l'utilisateur a la base de donner
    ref.doc(obj.id).set(obj)
        .then(result => {
            setSucces('User added on the whiteliste ');
            setError('');
        })
        .catch((err)=>{
            setSucces('');
            setError(err);
        })


}
    return(
    <div>
        {!logger
            ?
            <div>
                login
                <input type="email" onChange={e => setEmail(e.target.value)}/>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <button onClick={loggin}> Connexion</button>
            </div>
            :
            <div>
                {error && <p className="alert error">{error} </p>}
                {succes && <p className="alert succes">{succes}</p>}
                listing account on the whiteliste
                {loaded &&
                    data.map(element => {
                        return <li key={element.id}>{element.address} - {element.balance}
                        - <button value={element.id} onClick={deleteAddress}>Delete</button>
                        </li>
                    })
                }
                Add an address on the whitelist
                <input type="text" onChange={e => setAddress(e.target.value)}/>
                <button onClick={AddOnWhitelist}>Add on the whitelist</button>
            </div>
        }
    </div>
    )
}

export default Admin;