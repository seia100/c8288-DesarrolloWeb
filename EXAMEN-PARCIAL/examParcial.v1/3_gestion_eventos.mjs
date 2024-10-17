// no se ejecuta :V

import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef, useContext, createContext } from 'react';

// Clase base Evento con encapsulación
// Define un evento con sus propiedades encapsuladas (id, titulo, descripcion, fecha, ubicacion).
class Evento {
    constructor(id, titulo, descripcion, fecha, ubicacion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.ubicacion = ubicacion;
    }

    // Método para retornar una descripción completa del evento.
    // Este método puede ser sobreescrito en clases derivadas (polimorfismo).
    getDescripcionCompleta() {
        return `${this.titulo} - ${this.descripcion} en ${this.ubicacion} el ${this.fecha}`;
    }
}

// Clase derivada EventoCorporativo que hereda de Evento
// Esta clase específica añade la propiedad "empresa" para eventos corporativos.
class EventoCorporativo extends Evento {
    constructor(id, titulo, descripcion, fecha, ubicacion, empresa) {
        super(id, titulo, descripcion, fecha, ubicacion);  // Llamada al constructor de la clase base
        this.empresa = empresa;  // Nueva propiedad que solo existe en eventos corporativos
    }

    // Sobreescritura del método getDescripcionCompleta
    // Este método ahora devuelve una descripción que incluye la empresa.
    getDescripcionCompleta() {
        return `${this.titulo} - Evento corporativo organizado por ${this.empresa} en ${this.ubicacion} el ${this.fecha}`;
    }
}

// Estado inicial para el reducer que manejará los eventos
const initialState = {
    eventos: [],  // Lista inicial de eventos vacía
};

// Definir las acciones para el reducer
// Esto permite agregar, editar o eliminar eventos en el estado global.
const ACTIONS = {
    ADD_EVENT: 'ADD_EVENT',
    EDIT_EVENT: 'EDIT_EVENT',
    DELETE_EVENT: 'DELETE_EVENT',
};

// Reducer para manejar el estado de los eventos
// Un reducer es una función que recibe el estado actual y una acción, y retorna un nuevo estado.
const eventReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_EVENT:
            // Agrega el nuevo evento a la lista de eventos en el estado
            return { ...state, eventos: [...state.eventos, action.payload] };
        case ACTIONS.EDIT_EVENT:
        // Busca el evento a editar por su id y lo reemplaza con los nuevos datos
            return {
                ...state,
                eventos: state.eventos.map((evento) =>
                evento.id === action.payload.id ? action.payload : evento
                ),
            };
        case ACTIONS.DELETE_EVENT:
        // Filtra la lista de eventos y elimina el que coincida con el id proporcionado
            return {
                ...state,
                eventos: state.eventos.filter((evento) => evento.id !== action.payload),
            };
        default:
            return state;  // Si no coincide con ninguna acción, retorna el estado sin cambios
    }
};

// Crear el contexto para manejar el estado global de los eventos
// Context proporciona una forma de pasar el estado global a todos los componentes sin prop drilling
const EventContext = createContext();

// Hook personalizado que simula operaciones asincrónicas (como llamadas a una API)
const useAsyncOperation = (callback) => {
    return useCallback(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                callback();  // Ejecuta la operación cuando se cumple la promesa
                resolve('Operación exitosa');  // Resuelve la promesa si todo sale bien
                } catch (error) {
                reject('Ocurrió un error');  // Rechaza la promesa en caso de error
                }
            }, 1000);  // Simula un retardo de 1 segundo
        });
    }, [callback]);
};

// Componente principal que gestiona los eventos
const EventManager = () => {
    const { state, dispatch } = useContext(EventContext);  // Obtiene el estado y el dispatcher del contexto
    const [editingEvent, setEditingEvent] = useState(null);  // Estado local para manejar si se está editando un evento
    const [newEventData, setNewEventData] = useState({
        titulo: '',         // Título del nuevo evento
        descripcion: '',    // Descripción del nuevo evento
        fecha: '',          // Fecha del nuevo evento
        ubicacion: '',      // Ubicación del nuevo evento
    });

    // Manejador de cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEventData((prev) => ({ ...prev, [name]: value }));  // Actualiza el estado con los valores del formulario
    };

    // Función para agregar un evento, envuelta en una operación asincrónica simulada
    const addEvent = useAsyncOperation(() => {
        const newEvent = new Evento(
        Date.now(),  // Genera un id único con la fecha actual
        newEventData.titulo,
        newEventData.descripcion,
        newEventData.fecha,
        newEventData.ubicacion
        );
        dispatch({ type: ACTIONS.ADD_EVENT, payload: newEvent });  // Agrega el nuevo evento al estado global
    });

    // Función para editar un evento existente, usando una operación asincrónica simulada
    const editEvent = useAsyncOperation(() => {
        const updatedEvent = { ...editingEvent, ...newEventData };  // Combina los datos actuales del evento con los nuevos
        dispatch({ type: ACTIONS.EDIT_EVENT, payload: updatedEvent });  // Despacha la acción de editar evento
        setEditingEvent(null);  // Resetea el estado de edición
    });

    // Función para eliminar un evento, también simulada asincrónicamente
    const deleteEvent = useAsyncOperation((id) => {
        dispatch({ type: ACTIONS.DELETE_EVENT, payload: id });  // Elimina el evento del estado global
    });

    // Función que maneja el submit del formulario, verifica si se está editando o creando un nuevo evento
    const handleSubmit = async () => {
        if (editingEvent) {
        await editEvent();  // Si está en modo de edición, edita el evento
        } else {
        await addEvent();  // Si no, crea un nuevo evento
        }
        setNewEventData({ titulo: '', descripcion: '', fecha: '', ubicacion: '' });  // Limpia los campos del formulario
    };

    // Función para pre-cargar los datos de un evento en el formulario cuando se va a editar
    const handleEditClick = (event) => {
        setEditingEvent(event);  // Establece el evento actual en modo de edición
        setNewEventData({
        titulo: event.titulo,
        descripcion: event.descripcion,
        fecha: event.fecha,
        ubicacion: event.ubicacion,
        });
    };

    // Función para eliminar un evento
    const handleDeleteClick = async (id) => {
        await deleteEvent(id);  // Llama a la función asincrónica para eliminar el evento
    };

    return (
        `<div>
        <h2>Gestión de Eventos</h2>
        <div>
            {/* Formulario para crear o editar eventos */}
            <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={newEventData.titulo}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={newEventData.descripcion}
            onChange={handleInputChange}
            />
            <input
            type="date"
            name="fecha"
            value={newEventData.fecha}
            onChange={handleInputChange}
            />
            <input
            type="text"
            name="ubicacion"
            placeholder="Ubicación"
            value={newEventData.ubicacion}
            onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>
            {editingEvent ? 'Guardar cambios' : 'Crear evento'}
            </button>
        </div>

        <h3>Lista de Eventos</h3>
        <ul>
            {/* Lista de eventos creados */}
            {state.eventos.map((event) => (
            <li key={event.id}>
                {event.getDescripcionCompleta()}  {/* Muestra la descripción completa del evento */}
                <button onClick={() => handleEditClick(event)}>Editar</button>
                <button onClick={() => handleDeleteClick(event.id)}>Eliminar</button>
            </li>
            ))}
        </ul>
        </div>`
    );
};

// Componente principal que envuelve el contexto global
const App = () => {
    const [state, dispatch] = useReducer(eventReducer, initialState);  // useReducer para manejar el estado global

    return (
        `<EventContext.Provider value={{ state, dispatch }}>
        <EventManager />  {/* Incluye el componente de gestión de eventos */}
        </EventContext.Provider>`
    );
};

export default App;
