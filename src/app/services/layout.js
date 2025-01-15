import "../styles/global.css"; // Import Tailwind here

export default function ServicesLayout({ children }) {
  return (
    <div className="">
      {/* <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Our Services</h1>
      </header> */}
      <main>{children}</main>
      {/* <footer className="bg-blue-600 text-white p-4">
        &copy; 2025 Our Company
      </footer> */}
    </div>
  );
}
