import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux";
import Store from "./redux/Store";
import Router from "./routers/Router";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={Store}>
        <Router />
        <Toaster
          position="top-right"
        />
      </Provider>
    </>
  )
}

export default App
