import { Outlet, useNavigate } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'

export default function AppLayout() {
  const navigate = useNavigate()

  const onAdd = () => {
    navigate('/transactions?add=1')
  }

  return (
    <div className="min-h-dvh">
      <TopBar onAdd={onAdd} />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 pb-10">
        <Outlet />
      </main>
    </div>
  )
}
