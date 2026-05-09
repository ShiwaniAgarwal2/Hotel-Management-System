import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from './components/ui/button'
import App from './app';


createRoot(document.getElementById("root")).render(
    // <StrictMode>
        <App />
    // </StrictMode>
);
