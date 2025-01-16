export default function Footer() {
  return (
    <div className="bg-blue-600  h-60 text-white flex justify-center items-center">
      <p>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  );
}
