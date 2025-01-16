export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white h-full flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="/dashboard"
              className="block hover:bg-blue-700 p-2 rounded"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/dashboard/services"
              className="block hover:bg-blue-700 p-2 rounded"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/dashboard/bookings"
              className="block hover:bg-blue-700 p-2 rounded"
            >
              Bookings
            </a>
          </li>
          <li>
            <a
              href="/dashboard/users"
              className="block hover:bg-blue-700 p-2 rounded"
            >
              Users - not implemented
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
