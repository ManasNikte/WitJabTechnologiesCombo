const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center justify-center text-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      We Develop Amazing Websites!
    </div>
  );
};

export default Generating;

