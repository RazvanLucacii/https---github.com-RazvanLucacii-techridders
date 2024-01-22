import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from './Navbar';
import Footer from './Footer';
import { Navigate } from 'react-router-dom';

export default class Registro extends Component {
    cajaNombre = React.createRef();
    cajaEmail = React.createRef();
    cajaRoles = React.createRef();
    cajaTelefono = React.createRef();
    cajaLinkedin = React.createRef();
    cajaPassword = React.createRef();
    cajaApellidos = React.createRef();
    cajaProvincia = React.createRef();

    state = {
        usuario: {},
        provincia: [],
        Role: [],
        empresacentros: [],
        error: null,  // Nuevo estado para manejar mensajes de error
        status: false
    }

    registro = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombre.current.value;
        var apellidos = this.cajaApellidos.current.value;
        var email = this.cajaEmail.current.value;
        var telefono = this.cajaTelefono.current.value;
        var linkedin = this.cajaLinkedin.current.value;
        var password = this.cajaPassword.current.value;
        var rol = parseInt(this.cajaRoles.current.value);
        var provincia = parseInt(this.cajaProvincia.current.value);
        if (!nombre || !apellidos || !email || !telefono || !linkedin || !password || isNaN(rol) || isNaN(provincia)) {
            // Mostrar mensaje de error en la interfaz de usuario
            this.setState({ error: "Por favor complete todos los campos obligatorios" });
            // Restablecer el estado de error después de 3 segundos (o el tiempo que desees)
            setTimeout(() => {
                this.setState({ error: null });
            }, 3500);
            return;
        }
        var datos = {
            "idUsuario":0,
            "apellidos": apellidos,
            "nombre": nombre,
            "email": email,
            "telefono": telefono,
            "linkedin": linkedin,
            "password": password,
            "idRole": rol,
            "idProvincia": provincia,
            "estado": 0,
            "idEmpresaCentro" : null
        }
        var headers = {
            "content-type": "application/json"
        }
        const request = 'api/usuarios';
        const url = Global.urlApi + request;
        axios.post(url, datos, headers).then(response => { 
            this.setState({
                status: true
            })
            Swal.fire({
                icon: "success",
                title: "Registro Completado",
            });  
        }).catch(error => {
            // Manejar errores de la solicitud HTTP si es necesario
            console.error("Error en la solicitud HTTP", error);
            // Actualizar el estado de error con un mensaje específico
            this.setState({ error: "Error en la solicitud HTTP" });
            Swal.fire({
                icon: "error",
                title: "Oops...",             
            }); 
        });
    }
    getProvincias = () => {
        const request = 'api/provincias';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                provincia: response.data
            })
        })
    }
    getEmpresasCentro = () =>{
        const request = 'api/empresascentros';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                empresacentros: response.data
            })
        })
    }
    componentDidMount = () => {
        this.getProvincias();
        this.getEmpresasCentro();
        this.MySwal = withReactContent(Swal);
    }
   
    render() {

        if(this.state.status === true){
            return (<Navigate to="/"/>)
        }else{
            return (
                <div>
                    <Navbar />
                    <div className='container mt-5 mb-5'>
                        <div className='card text-center'>
                            <h2 className='card-header'>Registro</h2>
                                <div className="card-body">
                                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                                    <form>
                                        <label>Roles:</label>
                                        <select name="rol" ref={this.cajaRoles} className="form-control">
                                            <option id="1" value="2">PROFESOR</option>
                                            <option id="2" value="3">TECHRIDER</option>
                                            <option id="3" value="4">REPRESENTANTE</option>
                                        </select>
                                        <br/>
                                        <div className="row">
                                            <div className='col md-6'>
                                                <label>Nombre:</label>
                                                <input type="text" name="nombre" ref={this.cajaNombre} className="form-control" />
                                            </div>
                                            <div className='col md-6'>
                                                <label>Apellidos:</label>
                                                <input type="text" name="apellidos" ref={this.cajaApellidos} className="form-control" />
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className='col md-6'>
                                                <label>Email:</label>
                                                <input type="email" name="email" ref={this.cajaEmail} className="form-control"/>
                                            </div>
                                            <div className='col md-6'>
                                                <label>Telefono:</label>
                                                <input type="text" name="telefono" ref={this.cajaTelefono} className="form-control"/>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className='col md-6'>
                                                <label>Linkedin:</label>
                                                <input type="text" name="linkedin" ref={this.cajaLinkedin} className="form-control"/>
                                            </div>
                                            <div className='col md-6'>
                                                <label>Contraseña:</label>
                                                <input type="password" name="pass" ref={this.cajaPassword} className="form-control"/>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className='col md-6'>
                                                <label>Repetir Contraseña:</label>
                                                <input type="password" name="reppass" className="form-control" />
                                            </div>
                                            <div className='col md-6'>
                                                <label>Provincia:</label>
                                                <select name="provincia" ref={this.cajaProvincia} className="form-control">
                                                    {           
                                                        this.state.provincia.map((provincia, index) => {
                                                            return(<option key={index} value={provincia.idProvincia}>
                                                                {provincia.nombreProvincia}
                                                            </option>)
                                                        })     
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        {/*<label>Empresa/Centro:</label>
                                        <select name="empresacentro" ref={this.cajaEmpresaCentro} className="form-control">
                                            <option value={null}>
                                                Sin Empresa/centro
                                            </option> 
                                            {                                          
                                                this.state.empresacentros.map((empresacentro, index) => {                                                  
                                                    return(<option key={index} value={empresacentro.idEmpresaCentro}>
                                                        {empresacentro.nombre}
                                                    </option>)
                                                }) 
                                            }
                                        </select>*/}
                                        <br/>
                                        <button className='btn btn-info' type="submit" onClick={this.registro}>Registrarse</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    <Footer />
                </div>
            );
	    }
    }
}
