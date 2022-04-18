import  {useState,useEffect} from 'react';



function InfosAccount(props) {

    return(

        <div>
            {!props.loader &&
                props.accounts.length >0 ?
                <div>
                    {props.balance && <p>You have {props.balance} eth on Your account .</p>}
                    <p>You are connected with this account : {props.accounts[0]}</p>
                    {props.balance < 0.3 && <p className="infos">You don't have Enought ETH on your account to go on our whitelist. </p>}
                </div>
                :
                <p>You are not Connected to this website.</p>
            }
        </div>
    );

}
export default InfosAccount;
