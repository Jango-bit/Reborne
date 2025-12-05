import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PackageMinus, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutate } from "@/hook/useMutate";
import { CATEGORY, newRequest } from "@/api/api";

// Validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
});

export default function CreateCategory({
  popupOpen,
  setPopupOpen,
  slug,
  setSlug,
}) {
  const { mutate, isLoading, isSuccess } = useMutate(
    newRequest,
    slug?._id ? `${CATEGORY}/${slug?._id}` : CATEGORY,
    "catergoryListing",
    slug?._id ? "put" : "post"
  );
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append valid values from the data object
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((item) => item?.id && formData.append(key, item.id));
      } else if (value !== null && value !== undefined) {
        formData.append(key, typeof value === "object" ? value.value : value);
      }
    });
    mutate({ formData });
  };

  const closePopup = () => {
    reset(null);
    setPopupOpen(false);
    slug?._id && setSlug(null);
  };
  useEffect(() => {
    if (isSuccess) {
      closePopup();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (slug) {
      setValue("name", slug?.name);
      setValue("slug", slug?.slug);
      setValue("description", slug?.description);
    }
  }, [slug]);
  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 bg-black/20 z-100 w-full h-full flex items-center justify-center">
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
                <Popover.Panel className="w-180 transform px-10 py-5 bg-white rounded-lg">
                  <div className="flex justify-between items-center">
                    <h1 className="text-neutral-700 text-base font-semibold leading-7">
                      {slug ? "Edit" : "Create"} Category
                    </h1>
                    <button
                      onClick={() => {
                        closePopup();
                      }}
                      className="text-black font-extrabold text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-5 my-5"
                  >
                    <div className="flex group flex-col space-y-2">
                      <label className="text-[#3A3A3A] required text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        placeholder="Enter Name"
                        type="text"
                        className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-[0.84rem] border-opacity-60 h-10 text-zinc-500"
                      />
                      {errors?.name && (
                        <span className="text-xs font-medium text-red-500">
                          {errors?.name?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex group flex-col space-y-2">
                      <label className="text-[#3A3A3A] required text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Slug
                      </label>
                      <input
                        {...register("slug", { required: true })}
                        placeholder="Enter Name"
                        type="text"
                        className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-[0.84rem] border-opacity-60 h-10 text-zinc-500"
                      />
                      {errors?.slug && (
                        <span className="text-xs font-medium text-red-500">
                          {errors?.slug?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex group col-span-2 flex-col space-y-2">
                      <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                        Description
                      </label>
                      <textarea
                        {...register("description", { required: true })}
                        autoComplete="off"
                        type="text"
                        className="rounded pt-1 border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-20 text-zinc-500"
                      />
                      {errors?.description && (
                        <span className="text-xs font-medium text-red-500">
                          {errors?.description?.message}
                        </span>
                      )}
                    </div>

                    <div className="w-full flex col-span-2">
                      <button
                        disabled={isLoading}
                        className="flex cursor-pointer bg-[#2E2E2E] text-white focus:outline-none text-sm gap-2 w-32 font-normal h-10 justify-center items-center rounded"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                            {slug ? "Updating..." : "Creating..."}
                          </div>
                        ) : slug ? (
                          "Update"
                        ) : (
                          "Create"
                        )}
                      </button>
                    </div>
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  );
}
