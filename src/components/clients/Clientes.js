import React, { useEffect, useState, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

import { Link } from 'react-router-dom';

const Clientes = () => {

   //trabajar con el state
   const [clientes, guardarclientes] = useState([]);

   useEffect(() => {
      //Query a la api
      const consultarAPI = async () => {
         const clientesConsulta = await clienteAxios.get('/clientes');

         //Colocar resutado en el state
         guardarclientes(clientesConsulta.data);
      }
      consultarAPI();
   }, [clientes]);

   return (
      <Fragment>
         <h2>Clientes</h2>
         <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
         <ul className="listado-clientes">
            {clientes.map(cliente => (
               <Cliente
                  key={cliente._id}
                  cliente={cliente}
               />
            ))}
         </ul>
      </Fragment>
   )
}
export default Clientes;