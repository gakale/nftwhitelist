import {useState , useEffect} from "react";
import {ref} from './../App';
import {v4 as uuidv4} from 'uuid';


// creatdoc permet de cree un document dans la base de donner

function AddWhiteList(props) {

    // creation de la fonction qui permet d'ajouter l'élément sur
    function createDoc(newDataObj) {
        // reffresh le nombre de personnse dans la white
        props.getCount();

        //  verified if adress eth is valid on fait une expression regulière

        if(newDataObj.address.match(/^0x[a-fA-F0-9]{40}$/)){
            // whitelist limit exceeded
            if(props.countData <4 ){
                // does this address already exists in the DB ?
                let i=0;
                ref.where("address","==", newDataObj.address)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            i++;

                        })
                        // if this address does not already exist in the DB , we add it
                        if(i < 1 ){
                            if (props.balance >= 0.3) {
                                ref.doc(newDataObj.id).set(newDataObj)
                                    .then(result => {
                                        props.setSucces('You have been added to the whitelist!');
                                        props.setError('');
                                    })
                                    .catch((err)=>{
                                    props.setSucces('');
                                    props.setError('Error, we are sorry.');
                                })
                            }
                            else  {
                                props.setSucces('');
                                props.setError('Not enought funds on your wallet (0.3 minimum).');

                            }
                        }
            else {
                            props.setSucces('');
                            props.setError('this address is already on the whitelist.');
                        }


                    })
                    .catch(function (error) {
                        props.setSucces('');
                        props.setError('Error We are sorry.');

                    });
            }else{
                props.setSucces('');
                props.setError('Whitelise max limit exceeded.');
            }
        }
        else{
            props.success('');
            props.setError('Invalid Address.')
        }
        setTimeout(props.getCount,500);



    }
    return(
        <div>
            {props.balance >= 0.3 &&
            < button className="btn" onClick={() =>{
                createDoc({address:props.account[0], id: uuidv4(), balance: props.balance})
            }}>Go on Whitelist </button>
            }
        </div>
    )
}
export default AddWhiteList;