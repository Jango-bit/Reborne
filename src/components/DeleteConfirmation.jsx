import { newRequest } from "@/api/api";
import { useMutate } from "@/hook/useMutate";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";

export default function DeleteConfirmation({
  api,
  querykey,
  popupOpen,
  setPopupOpen,
  method = "delete",
}) {
  const { mutate, isLoading, isSuccess } = useMutate(
    newRequest,
    api,
    querykey,
    method
  );
  const handleDelete = () => {
    mutate({});
  };
  useEffect(() => {
    if (isSuccess) {
      setPopupOpen(false);
    }
  }, [isSuccess]);
  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 w-full h-full flex items-center justify-center">
          <Popover className="relative">
            <>
              <Transition
                as={Fragment}
                show={popupOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-92 transform">
                  <div className="overflow-hidden px-7 pt-8 pb-5 bg-white rounded-lg shadow-lg">
                    <div className="">
                      <div className="flex flex-col gap-4 items-center justify-center p-2">
                        <div className="flex relative h-16 w-16 items-center justify-center rounded">
                          <img
                            className="object-contain h-full w-full"
                            fill
                            src={"/dashboard/icons/delete.svg"}
                          />
                        </div>
                        <h5 className="text-[#3A3A3A] text-base tracking-[0.2px] font-semibold">
                          Delete?
                        </h5>
                      </div>
                      <p className="text-[0.9rem] font-normal text-center mt-5 text-[#8D8D8D]">
                        Are you sure you want to delete <br /> this record?
                      </p>
                    </div>
                    <div className="flex mt-5 items-center tracking-[0.2px] justify-between gap-4 rounded-md px-2 py-2">
                      <div
                        onClick={() => setPopupOpen(false)}
                        className="flex cursor-pointer bg-[#F5F5F5] text-[#2E2E2E] text-sm gap-2 font-medium h-10 w-full justify-center items-center rounded"
                      >
                        Cancel
                      </div>
                      <div
                        onClick={handleDelete}
                        className="flex cursor-pointer bg-[#FF5959] text-white focus:outline-none focus-visible:ring transition duration-150 ease-in-out focus-visible:ring-orange-500/50 text-sm gap-2 font-normal h-10 w-full justify-center items-center rounded"
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  );
}
