import { newRequest, PRODUCTS } from "@/api/api";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import NoData from "@/components/NoData";
import Pagination from "@/components/table/Pagination";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageLimit = 10;
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [slug, setSlug] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["productListing", currentPage, pageLimit],
    queryFn: async () => {
      const res = await newRequest.get(PRODUCTS, {
        params: { limit: pageLimit, page: currentPage },
      });
      return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    setTotalPages(data?.pages || 0);
  }, [data?.pages]);

  const list = useMemo(() => data?.products || [], [data]);

  const columns = useMemo(
    () => [
      {
        header: "Sl No",
        accessorKey: "slno",
        cell: ({ row }) =>
          currentPage * pageLimit - (pageLimit - (row.index + 1)),
      },

      // ✅ IMAGE COLUMN (FIXED)
      {
        header: "Image",
        accessorKey: "images",
        cell: ({ row }) => {
          const img = row?.original?.images?.[0];
          return img?.url ? (
            <img
              src={img.url}
              alt={img.alt || row.original.name}
              className="h-14 w-14 object-cover rounded border"
              loading="lazy"
            />
          ) : (
            <span className="text-xs text-gray-400">No Image</span>
          );
        },
      },

      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Brand",
        accessorKey: "brand",
      },
      {
        header: "Category",
        accessorKey: "category.name",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Stock",
        accessorKey: "countInStock",
      },
      {
        header: "Rating",
        accessorKey: "rating",
      },
      {
        header: "Reviews",
        accessorKey: "numReviews",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Link
              to={`/admin/product/edit/${row.original._id}`}
              className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 hover:shadow"
            >
              <Pencil size={16} />
            </Link>
            <div
              onClick={() => {
                setSlug(row.original._id);
                setOpenDeletePopup(true);
              }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-100 hover:shadow"
            >
              <Trash2 size={16} className="text-red-600" />
            </div>
          </div>
        ),
      },
    ],
    [currentPage]
  );

  return (
    <>
      <DeleteConfirmation
        popupOpen={openDeletePopup}
        setPopupOpen={setOpenDeletePopup}
        api={`${PRODUCTS}/${slug}`}
        querykey={"productListing"}
      />

      <div className="flex flex-col gap-4 pb-5">
        <div className="flex items-center justify-between border-b py-4 font-semibold">
          <h3>Products</h3>
          <Link
            to="create"
            className="flex items-center gap-2 rounded bg-black px-4 py-2 text-sm text-white"
          >
            <Plus size={16} />
            Create
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <img src="/loader/load.gif" className="h-10 w-10" />
          </div>
        ) : !list.length ? (
          <NoData />
        ) : (
          <>
            <QueryTable list={list} columns={columns} />
            <div className="ml-auto">
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