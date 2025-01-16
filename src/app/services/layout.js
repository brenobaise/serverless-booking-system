import "../styles/global.css"; // Import Tailwind here

export default function ServicesLayout({ children }) {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  );
}
