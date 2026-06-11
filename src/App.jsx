
import RoleContextProvider from "./context/RoleContextProvider"
import AppRoutes from "./routes/AppRoutes"


function App() {
  return (
    <RoleContextProvider>
        <AppRoutes/>
    </RoleContextProvider>

  )
}

export default App
