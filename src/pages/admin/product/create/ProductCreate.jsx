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

    <div className="flex flex-col pb-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b py-5 text-base font-semibold">
        Create Product
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-7"
      >
        {/* Name */}
        <Input label="Name" error={errors?.name}>
          <input {...register("name", { required: true })} />
        </Input>

        {/* Slug */}
        <Input label="Slug" error={errors?.slug}>
          <input {...register("slug", { required: true })} />
        </Input>

        {/* Description */}
        <Input label="Description">
          <input {...register("description")} />
        </Input>

        {/* Brand */}
        <Input label="Brand" error={errors?.brand}>
          <input {...register("brand", { required: true })} />
        </Input>

        {/* Category */}
        <div className="flex px-3 flex-col space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Category</label>
            <button type="button" onClick={() => setOpenCategoryPopup(true)}>
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CreatePaginateSelect
                api={CATEGORY}
                request={newRequest}
                limit={15}
                queryKey="catergoryListing"
                searchKey="name"
                customValue="_id"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Price */}
        <Input label="Price" error={errors?.price}>
          <input {...register("price", { required: true })} />
        </Input>

        {/* Stock */}
        <Input label="Stock In" error={errors?.countInStock}>
          <input {...register("countInStock", { required: true })} />
        </Input>

        {/* Colors */}
        <Input label="Colors">
          <input {...register("colors")} />
        </Input>

        {/* Sizes */}
        <Input label="Sizes">
          <input {...register("sizes")} />
        </Input>

        {/* Images */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 px-3">
          <label className="text-xs font-medium">Images</label>

          <label
            htmlFor="multiple-images"
            className="mt-2 flex h-10 cursor-pointer items-center justify-center gap-2 rounded border bg-blue-100 text-blue-700"
          >
            <Camera size={18} />
            Upload Images
          </label>

          <input
            id="multiple-images"
            onChange={handleImage}
            type="file"
            multiple
            className="hidden"
          />

          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img src={img} className="object-contain w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 px-3 flex justify-center sm:justify-start">
          <button
            disabled={isLoading}
            className="bg-[#2E2E2E] text-white px-10 h-10 rounded"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  </>
);
};
