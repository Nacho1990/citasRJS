import React, {useState, useEffect, Fragment} from 'react';

//COMPONENT CITA
function Cita({cita, index, eliminarCita}) {
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>   
      <button 
        onClick={() => eliminarCita (index)} 
        type="button" className="button eliminar u-full-width">Eliminar</button>   
    </div>
  )
}

//COMPONENT FORMULARIO
function Formulario ({crearCita}) {

  const stateInicial = {
    mascota: '',
    propietario: '',
    fecha:'',
    hora:'',
    sintomas:''
  }

  const [cita, actualizarCita] = useState(stateInicial);

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  //pasa cita a component principal
  const enviarCita = e => {
    e.preventDefault();

    //pasar cita  acomponente princiàl y reiniciar el state
    crearCita(cita)

    //reiniciar el state (vaciar el form)
    actualizarCita(stateInicial)

  }

  return(
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={enviarCita}>
        <label>Nombre Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota" 
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
          value={cita.fecha}
          onChange={actualizarState}
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora" 
          value={cita.hora}
          onChange={actualizarState}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
          value={cita.sintomas}
          onChange={actualizarState}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
    </Fragment>
  )
  
}

//COMPONENT APP
function App() {

  //cargar desde local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

        if(!citasIniciales) {
          citasIniciales = [];
        }

  //useStae retorna 2 funciones, el state y la func q lo actualiza
  const [citas, guardarCita] = useState(citasIniciales);

  //agregar nuevas citas
  const crearCita = cita => {
    //copio el state y agrego nueva cita
    const nuevasCitas = [...citas, cita]

    //guardar en el state
    guardarCita(nuevasCitas)

  }

  //elimnar las citas
  const eliminarCita= (index) => {
    const a = [...citas];
    a.splice(index, 1)
    guardarCita(a)
  }

  useEffect(
    () => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));

        if(citasIniciales) {
          localStorage.setItem('citas', JSON.stringify(citas));
        } else {
          localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas] //solo se ejecuta cunado modifico o agrego una cita
  )

  //cargar condicionalmente un titulo
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar Citas'

  return(
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) =>(
              <Cita 
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>

  )
}

export default App;
