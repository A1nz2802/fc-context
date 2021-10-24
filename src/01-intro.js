import { createContext, useContext } from 'react';

// createContext sirve para crear Contextos
// useContext es un hook que permite utilizar estos contextos dentro de un componente funcionales

// createContext recibe un valor por defecto, este valor puede ser un Obj, arreglo, num o cualquier tipo de datos
// Si no le damos un provider, se utilizará este 'valor por defecto'
const ContextDefault = createContext('valor por defecto');
const Context2 = createContext('valor por defecto 2');

// Provider es el encargado de pasarle el contexto hacia abajo (en este caso a Contenido)
const DefaultProvider = ({ children }) => {
  return (
    <ContextDefault.Provider value={'mi valor'}>
      { children }
    </ContextDefault.Provider>
  )
}

const Contenido = () => {
  // ctx es la abreviación de context en ingles
  const ctx = useContext( ContextDefault );
  return (
    <div>{ ctx }</div>
  )
}

const Contenido2 = () => {
  // ctx es la abreviación de context en ingles
  const ctx = useContext( Context2 );
  return (
    <div>{ ctx }</div>
  )
}

const App = () => {
  return (
    <DefaultProvider>
      <Contenido /> {/* mi valor */}
      <Contenido2 /> {/* valor por defecto 2 */}
    </DefaultProvider>
  )
}

export default App;