import { CATEGORY, newFormRequest, newRequest, PRODUCTS } from "@/api/api";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { CreatePaginateSelect } from "@/components/drop-down/CreatePaginateSelect";
import CreateCategory from "@/components/popup/category/CreateCategory";
import { useImageUploader } from "@/hook/useImageUploader";
import { useMutate } from "@/hook/useMutate";
import { useQuery } from "@tanstack/react-query";
import { Camera, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// schema
// const schema = Yup.object({
//   name: Yup.string().required("Business name  is required"),
//   owner: Yup.string().required("Owner name is required"),
//   contact: Yup.string().required("Phone number is required"),
//   email: Yup.string().email("Please enter correct email format"),
//   gstNo: Yup.string(),
// });
export const ProductCreate = () => {
  const { id } = useParams();
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const { mutate, isLoading, isSuccess } = useMutate(
    newFormRequest,
    `${PRODUCTS}/`,
    "catergoryListing",
    id ? "put" : "post",
    "/admin/product"
  );
  const {
    images,
    imageFiles,
    handleImage,
    removeImage,
    removeAllImages,
    setImages,
    removedImages,
  } = useImageUploader([], true);
  const { error, data } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () =>
      newRequest.get(`${PRODUCTS}/${id}`, {}).then((res) => res?.data),
    staleTime: 0,
    cacheTime: 0,
    enabled: !!id,
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
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
    for (let file of imageFiles) {
      formData.append("images", file);
    }
    formData.append("removedImages", JSON.stringify(removedImages));
    id ? mutate({ formData, id }) : mutate({ formData });
  };
  useEffect(() => {
    if (data) {
      setValue("name", data?.name);
      setValue("slug", data?.slug);
      setValue("description", data?.description);
      setValue("brand", data?.brand);
      setValue("price", data?.price);
      setValue("countInStock", data?.countInStock);
      setValue("rating", data?.rating);
      setValue("numReviews", data?.numReviews);
      setValue("colors", data?.colors);
      setValue("sizes", data?.sizes);
      if (data?.category) {
        setValue("category", {
          id: data?.category?._id,
          value: data?.category?._id,
          label: data?.category?.name,
        });
      }
      if (data?.images?.length > 0) {
        const list = data?.images?.map((src) => src?.url);
        setImages(list);
      }
    }
  }, [data]);
  return (
    <>
      <CreateCategory
        popupOpen={openCategoryPopup}
        setPopupOpen={setOpenCategoryPopup}
      />

      <div className="flex flex-col  min-h-fit pb-5">
        <div className="text-zinc-800 flex items-center justify-between gap-3 border-b py-5 border-b-gray-200 text-base font-semibold">
          Create Product
        </div>
        <div className="flex flex-col gap-3 min-h-[800px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-full grid-cols-3 gap-y-4 mt-7 "
          >
            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Name
              </label>
              <input
                autoComplete="off"
                type="text"
                {...register("name", { required: true })}
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.name && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Slug
              </label>
              <input
                autoComplete="off"
                type="text"
                {...register("slug", { required: true })}
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.slug && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.slug?.message}
                </span>
              )}
            </div>

            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Description
              </label>
              <input
                {...register("description")}
                autoComplete="off"
                type="text"
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.description && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.description?.message}
                </span>
              )}
            </div>

            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Brand
              </label>
              <input
                {...register("brand", { required: true })}
                autoComplete="off"
                type="text"
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.brand && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.brand?.message}
                </span>
              )}
            </div>
            <div className="flex px-3 group flex-col space-y-2">
              <div className="flex gap-x-3 items-center">
                <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                  Category
                </label>
                <button
                  onClick={() => setOpenCategoryPopup(true)}
                  type="button"
                  className="transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <Plus className="size-5" />
                </button>
              </div>

              <Controller
                name="category"
                control={control}
                //   rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <CreatePaginateSelect
                      api={CATEGORY}
                      request={newRequest}
                      limit={15}
                      queryKey={"catergoryListing"}
                      searchKey={"name"}
                      customValue="_id"
                      value={value}
                      onChange={(option) => {
                        onChange(option);
                      }}
                      className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
                    />
                    {error && (
                      <span className="text-xs font-medium text-red-500">
                        {error?.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Price
              </label>
              <input
                {...register("price", { required: true })}
                onKeyDown={(event) => {
                  if (
                    !/^[0-9]$/.test(event.key) ||
                    event.target.value.length >= 10
                  ) {
                    event.preventDefault();
                  }
                }}
                autoComplete="off"
                type="text"
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.price && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.price?.message}
                </span>
              )}
            </div>
            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Stock In
              </label>
              <input
                {...register("countInStock", { required: true })}
                onKeyDown={(event) => {
                  if (
                    !/^[0-9]$/.test(event.key) ||
                    event.target.value.length >= 10
                  ) {
                    event.preventDefault();
                  }
                }}
                autoComplete="off"
                type="text"
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.countInStock && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.countInStock?.message}
                </span>
              )}
            </div>

            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Colors
              </label>
              <input
                {...register("colors")}
                autoComplete="off"
                type="text"
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.colors && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.colors?.message}
                </span>
              )}
            </div>
            <div className="flex px-3 group flex-col space-y-2">
              <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                Sizes
              </label>
              <input
                {...register("sizes")}
                autoComplete="off"
                type="text"
                className="rounded border border-[#C7C7C7] w-full px-2 focus:border-[#2E2E2E] text-sm border-opacity-60 h-10 text-zinc-500"
              />
              {errors?.sizes && (
                <span className="text-xs font-medium text-red-500">
                  {errors?.sizes?.message}
                </span>
              )}
            </div>
            <div className="flex items-center col-span-3 gap-2">
              <div className="flex px-3 group flex-col space-y-2">
                <label className="text-[#3A3A3A] text-[0.8rem] group-focus-within:text-[#2E2E2E] font-medium">
                  Images
                </label>
                <div className="flex group flex-col space-y-2">
                  <label
                    htmlFor="multiple-images"
                    className="rounded  border cursor-pointer bg-blue-100 text-[#2F3EC7] border-[#C7C7C7] flex gap-2 items-center justify-center px-2 focus:border-[#2E2E2E]  font-medium border-opacity-60 h-10 "
                  >
                    <div className="w-4 relative h-4">
                      <Camera className="w-5 h-5" />
                    </div>
                    Upload Image
                  </label>
                  <input
                    id="multiple-images"
                    onChange={handleImage}
                    type="file"
                    multiple
                    className="hidden bg-[#5f7cf2]"
                    // disabled={!editable}
                  />
                </div>
              </div>

              <div className="text-zinc-400 flex items-center gap-4 text-sm px-7">
                {images.length > 0 && (
                  <div className="w-full">
                    <div className="flex  gap-x-10 items-center mb-2">
                      <span className="text-sm text-[#3A3A3A]">
                        {images.length} image(s) uploaded
                      </span>
                      {images.length > 1 && (
                        <button
                          onClick={removeAllImages}
                          className="text-xs text-[#C52020] hover:underline"
                        >
                          Remove All
                        </button>
                      )}
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      {images.map((img, index) => (
                        <div key={index} className="relative max-w-20 max-h-40">
                          <img
                            className="object-contain h-full w-full"
                            src={img}
                            alt={`Preview ${index + 1}`}
                          />
                          <div
                            onClick={() => removeImage(index)}
                            className="bg-[#FFCFCF] cursor-pointer text-[#C52020] rounded-full w-8 h-8 absolute -top-2 -right-2 flex justify-center items-center"
                          >
                            <X className="w-5 h-5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className=" w-full col-span-3  flex px-3">
              <button
                disabled={isLoading}
                className="bg-[#2E2E2E] font-medium rounded flex items-center justify-center text-[0.8rem] tracking-[0.1px] text-white h-10 w-fit px-10"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Saving
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
