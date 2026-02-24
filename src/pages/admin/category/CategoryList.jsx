import { CATEGORY, newRequest } from "@/api/api";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import NoData from "@/components/NoData";
import CreateCategory from "@/components/popup/category/CreateCategory";
import Pagination from "@/components/table/Pagination";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export const CategoryList = () => {
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [slug, setSlug] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;

  const { isLoading, data } = useQuery({
    queryKey: ["categoryListing", currentPage, pageLimit],
    queryFn: () =>
      newRequest.get(CATEGORY, {
        params: { limit: pageLimit, page: currentPage },
      }).then((res) => res?.data),
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    setTotalPages(data?.pages);
  }, [data?.pages]);

  const list = useMemo(() => data?.data, [data]);

  const columns = useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "id",
        cell: ({ row }) =>
          currentPage * pageLimit - (pageLimit - (parseInt(row.id) + 1)),
      },
      { header: "Name", accessorKey: "name" },
      {
        header: "Description",
        accessorKey: "description",
        cell: ({ getValue }) => (
          <span className="line-clamp-2 max-w-xs block">
            {getValue()}
          </span>
        ),
      },
      { header: "Slug", accessorKey: "slug" },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSlug(row.original);
                setOpenCategoryPopup(true);
              }}
              className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded bg-[#F5F5F5] hover:shadow transition"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => {
                setSlug(row.original._id);
                setOpenDeletePopup(true);
              }}
              className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded bg-[#F5F5F5] hover:shadow transition"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        ),
      },
    ],
    [currentPage]
  );

  return (
    <>
      {/* Create / Edit Popup */}
      <CreateCategory
        popupOpen={openCategoryPopup}
        setPopupOpen={setOpenCategoryPopup}
        setSlug={setSlug}
        slug={slug}
      />

      {/* Delete Popup */}
      <DeleteConfirmation
        popupOpen={openDeletePopup}
        setPopupOpen={setOpenDeletePopup}
        api={`${CATEGORY}/${slug}`}
        querykey="categoryListing"
      />

      <div className="flex flex-col gap-4 pb-5 w-full">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b py-4">
          <h3 className="text-zinc-800 text-base font-semibold">
            Category
          </h3>

          <button
            onClick={() => setOpenCategoryPopup(true)}
            className="flex items-center justify-center gap-2 rounded bg-[#2E2E2E] px-4 h-10 text-sm text-white w-full sm:w-auto"
          >
            <Plus size={16} />
            Create
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        {isLoading ? (
          <div className="flex mt-24 justify-center">
            <img src="/loader/load.gif" className="h-10 w-10" />
          </div>
        ) : !list?.length ? (
          <NoData />
        ) : (
          <>
            {/* ===== TABLE (SCROLL ON MOBILE) ===== */}
            <div className="w-full overflow-x-auto rounded-lg border">
              <div className="min-w-[700px]">
                <QueryTable list={list} columns={columns} />
              </div>
            </div>

            {/* ===== PAGINATION ===== */}
            <div className="flex justify-center sm:justify-end mt-4">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};