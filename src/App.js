import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RoutesApp from "./routes";
function App() {
  return (
    <div>
      <ToastContainer autoClose={'3000'} />
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
