export default function Footer() {
  return (
    <div className="bg-blue-600 h-52 text-white flex justify-center items-center text-center px-4">
      <p className="text-sm md:text-base">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  );
}
