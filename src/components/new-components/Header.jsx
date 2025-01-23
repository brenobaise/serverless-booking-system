function Header() {
  return (
    <div>
      <ul
        className="flex flex-col justify-between  text-white  
     "
      >
        <div className="flex flex-col justify-center items-end gap-6 p-4 md:justify-start md:mx-auto md:flex-row md:p-6">
          <li>Home</li>
          <li>About</li>
          <li>Contact Us</li>
        </div>
        <div className="flex flex-col justify-normal items-center md:items-end">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            LogOut
          </button>
        </div>
      </ul>
    </div>
  );
}
export default Header;
