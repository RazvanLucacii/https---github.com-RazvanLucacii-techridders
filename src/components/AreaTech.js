import React, { Component } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'
import Global from './Global';
import { Navigate } from 'react-router-dom';

export default class AreaTech extends Component {

  state = {
    statusToken: false,
    token: localStorage('token'),
    statusUsuarios: false,
    usuarios: [],
  }

  GetUsuarios = () => {
    const request = 'api/usuarios/';
    const url = Global.urlApi + request;
    const headers = { Authorization: 'Bearer ' + this.state.token };
  
    try {
      const response =  axios.get(url, { headers });
  
      this.setState({
        statusUsuarios: true,
        usuarios: response.data,
        statusToken: false
      });
  
      // Global
      Global.tipoUsuario = response.data.idRole;
      Global.token = this.state.token;

      // Guardar en localStorage
      localStorage.setItem('tipoUsuario', response.data.idRole);
      localStorage.setItem('token', this.state.token);
  
      alert("Dato añadido al global usuario");
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };
  render() {
    return (
      <div>
            <Navbar />
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4>Área de Usuario</h4>
                            </div>
                            <div class="card-body">
                                <h5>Nombre</h5>
                                <button className='btn btn-success' onClick={<Navigate to="/mischarlas" />}>
                                  Ver Charlas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
      </div>
    )
  }
}