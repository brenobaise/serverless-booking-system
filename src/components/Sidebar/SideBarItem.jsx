/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Link from "next/link"; // Import Link for Next.js routing

function SidebarItem({ iconPath, itemName, url, size }) {
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-md",
    large: "px-10 py-4 text-lg",
  };

  return (
    <Link href={url}>
      <div
        className={`m-4  rounded-md border-none text-white text-opacity-70 font-medium
          hover:bg-slate-800 hover:text-opacity-100 animation ease-in delay-85 hover:scale-125`}
      >
        <div
          className={`flex flex-row items-center gap-4 ${sizeClasses[size]}`}
        >
          <div className="bg-transparent">
            <img src={iconPath} alt={`${itemName} icon`} className="h-8 w-8" />
          </div>
          <div className="bg-transparent">{itemName}</div>
        </div>
      </div>
    </Link>
  );
}

export default SidebarItem;
