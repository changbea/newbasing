import { Link } from 'react-router-dom';
import './Navigate.css'

export default function Navigate() {
    return (
        <div className='navigate'>
            <Link to="/" className="d-inline-block w-25">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    class="bi bi-pentagon"
                    viewBox="0 0 16 16"
                >
                    <path d="M7.685 1.545a.5.5 0 0 1 .63 0l6.263 5.088a.5.5 0 0 1 .161.539l-2.362 7.479a.5.5 0 0 1-.476.349H4.099a.5.5 0 0 1-.476-.35L1.26 7.173a.5.5 0 0 1 .161-.54l6.263-5.087Zm8.213 5.28a.5.5 0 0 0-.162-.54L8.316.257a.5.5 0 0 0-.631 0L.264 6.286a.5.5 0 0 0-.162.538l2.788 8.827a.5.5 0 0 0 .476.349h9.268a.5.5 0 0 0 .476-.35l2.788-8.826Z" />
                </svg>
            </Link>
            <div className="d-inline-block w-75 text-center">
                <Link to='/cf'>Current Focus</Link>
                <span> /&emsp;</span>
                <Link to="/recommendations">Recommendations</Link>
                <span> /&emsp;</span>
                <Link to="/resume">Resume</Link>
                <span> /&emsp;</span>
                <Link to="/drink">Drink</Link>
                <span> /&emsp;</span>
                <Link to="/subway">Subway</Link>
                <span> /&emsp;</span>
                <Link to="/cards">Cards</Link>
            </div>
        </div>
    );      
}