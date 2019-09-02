import React from "react";

interface CustomHeaderProps {

}

export function header(props: Readonly<CustomHeaderProps>){
    return (
        <h1>Header</h1>
    );
}