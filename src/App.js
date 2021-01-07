import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** Layout*/
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

/** Componentes*/
import Clientes from './components/clients/Clientes';
import NuevoCliente from './components/clients/NuevoCliente';
import EditarCliente from './components/clients/EditarCliente';



import Productos from './components/productos/Productos';
import EditarProducto from './components/productos/EditarProducto';
import NuevoProducto from './components/productos/NuevoProducto';

import Pedidos from './components/pedidos/Pedidos';
function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />

              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />

              <Route exact path="/pedidos" component={Pedidos} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  )
}

export default App;
