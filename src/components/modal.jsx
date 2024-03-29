export function Modal({ title, toggleClick, children }) {
    return (
      <div >
        <div  className="fixed inset-0 flex items-center justify-center w-screen min-h-screen overflow-y-scroll transition-opacity duration-300 bg-black bg-opacity-10 z-[100] ">
          {children}
        </div>
      </div>
    );
  }