export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Chatman.media</h1>
        <p className="text-xl text-center text-gray-600">Сообщество свободных и креативных людей</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Творчество</h2>
            <p className="text-gray-600">
              Делитесь своими работами и получайте гарантированные просмотры
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Сообщество</h2>
            <p className="text-gray-600">
              Находите единомышленников и создавайте совместные проекты
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Свобода</h2>
            <p className="text-gray-600">Выходите из системы страха и раскрывайте свой потенциал</p>
          </div>
        </div>
      </div>
    </main>
  )
}
