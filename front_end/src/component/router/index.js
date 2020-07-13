import React from 'react';
import { Route } from 'react-router-dom'

import Cadastro from '../../pages/telaCadastro.js';
import Lista from '../../pages/telaListaEntregas.js';
import Maps from '../../pages/telaMaps.js';

export default function Router() {
    return (
        <div>
            <Route path="/" exact component={Cadastro} />
            <Route path="/entregas" component={Lista} />
            <Route path="/maps" component={Maps} />
        </div>
    )
}
