import { CATEGORY, newFormRequest, newRequest, PRODUCTS } from "@/api/api";
import { CreatePaginateSelect } from "@/components/drop-down/CreatePaginateSelect";
import CreateCategory from "@/components/popup/category/CreateCategory";
import { useImageUploader } from "@/hook/useImageUploader";
import { useMutate } from "@/hook/useMutate";
import { useQuery } from "@tanstack/react-query";
import { Camera, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ProductCreate = () => {
  const { id } = useParams();
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);

  const { mutate, isLoading } = useMutate(
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
    setImages,
    removedImages,
  } = useImageUploader([], true);

  const { data } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () =>
      newRequest.get(`${PRODUCTS}/${id}`).then((res) => res?.data),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== null && value !== undefined) {
        formData.append(key, typeof value === "object" ? value.value : value);
      }
    });

    imageFiles.forEach((file) => formData.append("images", file));
    formData.append("removedImages", JSON.stringify(removedImages));

    id ? mutate({ formData, id }) : mutate({ formData });
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("slug", data.slug);
      setValue("description", data.description);
      setValue("brand", data.brand);
      setValue("price", data.price);
      setValue("countInStock", data.countInStock);
      setValue("colors", data.colors);
      setValue("sizes", data.sizes);

      if (data.category) {
        setValue("category", {
          value: data.category._id,
          label: data.category.name,
        });
      }

      if (data.images?.length) {
        setImages(data.images.map((i) => i.url));
      }
    }
  }, [data]);

  const Field = ({ label, error, children }) => (
    <div className="flex w-full px-2 sm:px-3 flex-col space-y-1">
      <label className="text-[#3A3A3A] text-[0.75rem] sm:text-[0.8rem] font-medium">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs font-medium text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );

  const inputClass =
    "w-full rounded border border-[#C7C7C7] h-10 px-2 text-sm text-zinc-600 focus:outline-none focus:border-[#2E2E2E]";

  return (
    <>
      <CreateCategory
        popupOpen={openCategoryPopup}
        setPopupOpen={setOpenCategoryPopup}
      />

      <div className="flex flex-col pb-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b py-4 text-base font-semibold">
          {id ? "Edit" : "Create"} Product
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
            mt-6
          "
        >
          <Field label="Name" error={errors.name}>
            <input
              {...register("name", { required: "Name is required" })}
              className={inputClass}
            />
          </Field>

          <Field label="Slug" error={errors.slug}>
            <input
              {...register("slug", { required: "Slug is required" })}
              className={inputClass}
            />
          </Field>

          <Field label="Description">
            <input {...register("description")} className={inputClass} />
          </Field>

          <Field label="Brand" error={errors.brand}>
            <input
              {...register("brand", { required: "Brand is required" })}
              className={inputClass}
            />
          </Field>

          {/* Category */}
          <div className="flex w-full px-2 sm:px-3 flex-col space-y-2">
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

          <Field label="Price" error={errors.price}>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className={inputClass}
            />
          </Field>

          <Field label="Stock" error={errors.countInStock}>
            <input
              type="number"
              {...register("countInStock", { required: "Stock is required" })}
              className={inputClass}
            />
          </Field>

          <Field label="Colors">
            <input {...register("colors")} className={inputClass} />
          </Field>

          <Field label="Sizes">
            <input {...register("sizes")} className={inputClass} />
          </Field>

          {/* Images */}
          <div className="col-span-1 md:col-span-2 xl:col-span-3 px-2 sm:px-3">
            <label className="text-xs font-medium">Images</label>

            <label
              htmlFor="images"
              className="mt-2 flex h-10 cursor-pointer items-center justify-center gap-2 rounded border bg-blue-100 text-blue-700"
            >
              <Camera size={18} />
              Upload Images
            </label>

            <input
              id="images"
              type="file"
              multiple
              className="hidden"
              onChange={handleImage}
            />

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-square border rounded"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-contain"
                    />
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
          <div className="col-span-1 md:col-span-2 xl:col-span-3 px-3 flex justify-center sm:justify-start">
            <button
              disabled={isLoading}
              className="bg-[#2E2E2E] text-white w-full sm:w-auto px-10 h-10 rounded"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};