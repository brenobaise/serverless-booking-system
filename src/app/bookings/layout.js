import "../styles/global.css"; // Import Tailwind here

export default function BookingsLayout({ children }) {
  return (
    <div className="">
      <h2> Search your bookings by your email</h2>
      <main>{children}</main>
    </div>
  );
}
