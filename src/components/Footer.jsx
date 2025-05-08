/* eslint-disable react/react-in-jsx-scope */
import EditableBackground from "./EditableBackground";
function Footer() {
  return (
    <EditableBackground
      configKey={"footer-bg-colour"}
      defaultBgClass={"bg-slate-900"}
      btnName={"Change Footer Colour"}
    >
      <div className='flex flex-row h-[300px] justify-center items-center'>
        <div className='text-white text-md font-light max-h-[300px] flex flex-col items-center'>
          <p>BEng Software Engineering , University of Westminster</p>
          <br></br>
          <hr className='border-1 w-full'></hr>
          <p className='text-md p-6'>Joao BrenoBaise Zaniboni</p>
        </div>
      </div>
    </EditableBackground>
  );
}
export default Footer;
