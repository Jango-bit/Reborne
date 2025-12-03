// import Empty from "/empty/empty-box.svg"

export default function NoData() {
  return (
    <div className="w-full mt-20 h-full relative flex justify-center items-center ">
      <div className="flex flex-col gap-2 items-center justify-center py-16 px-4 rounded-lg border border-gray-200">
        <div className="flex relative h-16 w-16 items-center justify-center rounded ">
          <img
            className="object-contain h-full w-full"
            src={"/empty/empty-box.svg"}
          />
        </div>
        <h5 className="text-[#3A3A3A] text-base tracking-[0.2px] font-semibold">
          No data found!
        </h5>
        <p className="text-neutral-400 text-center w-60">
          There is no data to show you right now.
        </p>
      </div>
      {/* <div className="border-2 border-blue-950 h-1/2 w-1/2 p-5">
        <img
          className="object-contain h-full w-full"
          fill
          src={"/empty/empty-box.svg"}
          alt=""
          className="w-5 h-5"
        />
      </div> */}
    </div>
  )
}
