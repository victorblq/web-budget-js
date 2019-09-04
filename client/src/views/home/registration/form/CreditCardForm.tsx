import React from "react";
import {Button} from "@material-ui/core";
import {Header} from "../../components/Header";

export function CreditCardForm (props: Readonly<any>){

     return (
         <>
             <Header title="Credit Cards" subtitle="Cards management">
                 <div>
                     <Button variant="contained" color="primary" onClick={() => props.history.go(-1)}>
                         Back
                     </Button>
                 </div>
             </Header>
            <h1>{props.match.params.id}</h1>
         </>
     );
}