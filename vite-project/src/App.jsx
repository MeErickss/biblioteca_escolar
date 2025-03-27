import { Button } from 'antd';

export function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Hello Vite + React + Tailwind + Ant Design!</h1>
      <Button type="primary" className="mt-4">Botão Ant Design</Button>
    </div>
  )
}