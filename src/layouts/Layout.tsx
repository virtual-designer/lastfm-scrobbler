import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-[100vh]">
            <Sidebar />
            <main className='ml-3 mt-3'>
                <Outlet />
            </main>
        </div>
    )
}