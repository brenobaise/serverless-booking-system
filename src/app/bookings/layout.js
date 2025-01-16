import "../styles/global.css"; // Import Tailwind here

export default function BookingsLayout({ children }) {
  return (
    <div className="">
      <h2> Bookings by Email search</h2>
      <main>{children}</main>
    </div>
  );
}
