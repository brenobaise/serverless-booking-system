import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <div className="bg-blue-600 min-h-20 flex justify-start  items-center">
      <LogoutButton />
      <h1 className="text-bold text-white text-4xl pl-10  ">Our Services</h1>
    </div>
  );
}
