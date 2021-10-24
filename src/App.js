import { createContext, useContext, useState, memo, useCallback } from "react";
// Ejemplo para mostrar el problema que tiene context

const Context = createContext()

const ContadorProvider = ({ children }) => {
  const [ contador, setContador ] = useState(0);

  // Intentado optimizar las funciones con useCallback
  const incrementar = useCallback(() => setContador(x => x + 1),[]);
  const decrementar = useCallback(() => setContador(x => x - 1),[]);
  
  return (
    // Si es que existe un pequeño cambio en nuestro Provider
    // siempre se va a re-renderizar todos los componentes que esten utilizando nuestro contexto
    // No existe una manera que podamos optimizar componentes que se esten conectado a nuestro Contexto
    // Este problema no significa nada para aplicaciones pequeñas
    // Mientras más crezca nuestra aplicación mientras más context's tienes y mientras más cambios de estado tengas
    // esto lo que hará es gatillar más re-renders

    // ¿Cuándo se debe usar Context?
    // Se recomienda usar Context cuando tenemos una aplicación que maneje datos que no cambien a lo largo de la app
    // Ejemplos: El idioma que tiene seleccionado el usuario, constantes de idiomas, el usuario o algún otro
    // cambio específico que no cambie demasiado el usuario.
    // Por lo tanto context es una herramienta de propósitos específicos
    // Sirve para almacenar estados que no cambien o no cambien tanto.
    <Context.Provider value={{ contador, incrementar, decrementar }}>
      { children }
    </Context.Provider>
  )
}

// Intentado memoizar el componente Incrementar el cual NO recibe ningún parámetro
const Incrementar = memo(() => {
  console.log('incrementar');
  const { incrementar } = useContext( Context );
  
  return (
    <button onClick={ incrementar }>Incrementar</button>
  )
})

const Decrementar = memo(() => {
  console.log('decrementar');
  const { decrementar } = useContext( Context );
  
  return (
    <button onClick={ decrementar }>Decrementar</button>
  )
})

const Label = () => {
  console.log('Label');
  const { contador } = useContext( Context );
  
  return (
    <h1>{contador}</h1>
  )
}

const App = () => {
  return (
    <ContadorProvider>
      <Label />
      <Incrementar />
      <Decrementar />
    </ContadorProvider>
  )
}

export default App;
