import React from 'react';

const footer ={
        position: "absolute",
        bottom: 0, 
        width: "100%", 
        height: 40,
        fontWeigth: "bold"
}

export default function telaCadastro() {
    return (
        <footer style={footer} className="bg-danger text-center text-white">2020@Markus Lima</footer>
    )
}