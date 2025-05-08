function Dialog({ children }) {
  return (
    <div className='bg-slate-800 h-[800px] min-w-[800px] overflow-hidden rounded-tr-xl rounded-br-xl'>
      <div
        className='flex flex-col justify-start grow-0 sm:m-5 rounded-sm h-full 
      overflow-y-auto'
      >
        {children}
      </div>
      <h1>TELLO</h1>
    </div>
  );
}
export default Dialog;
