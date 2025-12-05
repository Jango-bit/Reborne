import { newRequest, PRODUCTS } from "@/api/api";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import NoData from "@/components/NoData";
import Pagination from "@/components/table/Pagination";
import QueryTable from "@/components/table/QueryTable";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProjectList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [slug, setSlug] = useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ["productListing", currentPage, pageLimit],
    queryFn: () =>
      newRequest
        .get(PRODUCTS, {
          params: {
            limit: pageLimit,
            page: currentPage,
          },
        })
        .then((res) => res?.data),
    staleTime: 0,
    cacheTime: 0,
  });
  useEffect(() => {
    setTotalPages(data?.pages);
  }, [data?.pages]);
  console.log(data);
  const list = React.useMemo(() => data?.products, [data]);
  const columns = React.useMemo(
    () => [
      {
        header: "Sl no",
        accessorKey: "id",
        cell: ({ row }) =>
          currentPage * pageLimit - (pageLimit - (parseInt(row?.id) + 1)),
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
        header: "Stock In",
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
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              <Link
                to={`/admin/product/edit/${row?.original?._id}`}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-[#F5F5F5] px-2 text-[#2C2C2C] transition-all duration-500 hover:scale-[1.05] hover:shadow"
              >
                <Pencil className="text-[#2C2C2C]" />
              </Link>
              <div
                onClick={() => {
                  setSlug(row?.original?._id);
                  setOpenDeletePopup(true);
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-[#F5F5F5] px-2 transition-all duration-500 hover:scale-[1.05] hover:shadow"
              >
                <Trash2 className="text-[#B80909]/80" />
              </div>
            </div>
          );
        },
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

      <div className="flex  flex-col gap-4 pb-5">
        <div className="text-zinc-800   flex items-center justify-between gap-3 border-b py-4  border-b-gray-200 text-base font-semibold">
          <div className="flex gap-4 text-zinc-400">
            <h3 className="text-zinc-800">Products</h3>
          </div>
          <Link
            to={`create`}
            className="flex cursor-pointer bg-[#2E2E2E] text-sm gap-2 font-normal h-10 w-28 justify-center items-center text-white rounded-[5px]"
          >
            <Plus className="size-4" />
            Create
          </Link>
        </div>
        {isLoading ? (
          <div className="flex mt-28 items-center justify-center w-full h-full">
            <div className="relative h-10 w-10">
              <img
                src="/loader/load.gif"
                className="object-contain h-full w-full"
              />
            </div>
          </div>
        ) : (
          <>
            {!list?.length ? (
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
          </>
        )}
      </div>
    </>
  );
};
