import SidebarItem from "@/components/Sidebar/SideBarItem";

function SideBar() {
  return (
    <div className=' flex flex-row'>
      <div className='flex flex-col justify-start  grow-0 bg-blue-700  w-[250px] rounded-tl-xl rounded-bl-xl border-3'>
        <SidebarItem
          iconPath={"/overview.svg"}
          url={"/dashboard/storeconfigs"}
          itemName={"Overview"}
          size={"large"}
        />
        <SidebarItem
          iconPath={"/booking.svg"}
          url={"/dashboard/bookings"}
          itemName={"Bookings"}
          size={"large"}
        />
        <SidebarItem
          iconPath={"/services.svg"}
          url={"/dashboard/services"}
          itemName={"Services"}
          size={"large"}
        />
        <SidebarItem
          iconPath={"/services.svg"}
          url={"/dashboard"}
          itemName={"Change Password"}
          size={"large"}
        />
      </div>
    </div>
  );
}
export default SideBar;
