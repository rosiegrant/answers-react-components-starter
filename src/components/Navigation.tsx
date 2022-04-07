import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className='flex flex-row'>
            <Link className='text-blue-500 hover:underline p-2' to='/'>Universal Page</Link>
            <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
            <Link className='text-blue-500 hover:underline p-2' to='./parks'>Parks Page</Link>
        </nav>
    );
}