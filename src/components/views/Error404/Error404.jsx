import { Link } from 'react-router-dom';

// Styles
import './Error404.css';

export default function Error404() {
    return <div className='error404__container'>
        <p>Página no existente</p>
        <Link className='error404__btn' to="/">Volver a la página principal</Link>
    </div>
}