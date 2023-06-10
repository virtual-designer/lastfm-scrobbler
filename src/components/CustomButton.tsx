
export default function CustomButton({ children, ...props }: any) {
    return <button className="px-[15px] py-[10px] text-[16px] rounded-[5px] focus:outline-double focus:outline-2 focus:outline-slate-400 cursor-pointer border-0 text-white bg-[#444] hover:bg-[#333]" {...props}>{children}</button>;
}