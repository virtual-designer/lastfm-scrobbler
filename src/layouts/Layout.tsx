import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-[100vh]">
            <Sidebar />
            <main className='my-3 ml-3 mr-8 p-2 w-[100%] max-w-[100%] overflow-x-hidden'>
                <Outlet />
            </main>
        </div>
    )
}