import { customSelectStyles } from "@/utils/customStyles";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

export const CreatePaginateSelect = ({
  queryKey,
  request,
  api,
  limit,
  name = "name",
  customValue = "id",
  searchKey,
  extraValue = false,
  isEnabled = false,
  isSugestion = false,
  isCreatable = false,
  enableValue = "",
  extraParams = null,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const fecthItems = async ({ pageParam = 1 }) => {
    const response = await request.get(api, {
      params: {
        page_size: limit,
        page: pageParam,
        [searchKey]: searchKey && searchQuery,
        ...extraParams,
      },
    });
    if (!response.data) throw new Error("Network error");
    const data = await response.data;
    const totalPages = data?.total_pages;
    return {
      data: data?.data,
      nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
    };
  };
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [
      queryKey,
      searchKey,
      searchQuery,
      isSugestion,
      api,
      isEnabled,
      enableValue,
    ],
    queryFn: fecthItems,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: isSugestion
      ? searchKey && !!searchQuery
      : isEnabled
      ? !!enableValue
      : true,
    // enabled: !!enabled || searchKey && !!searchQuery,
  });
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };
  const options =
    data?.pages?.flatMap((page) =>
      page.data.map((item) => {
        const nameParts = name.split(",");
        const label = nameParts
          .map((path) => getNestedValue(item, path.trim()))
          .filter((value) => value) // Filter out any undefined or null values
          .join(" "); // Join the values with a space
        return {
          label: label,
          value: getNestedValue(item, customValue),
          id: getNestedValue(item, customValue),
          extraValue: extraValue ? item : null,
        };
      })
    ) || [];
  return isCreatable ? (
    <CreatableSelect
      options={options}
      isLoading={isFetching}
      onMenuScrollToBottom={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
      isClearable
      formatCreateLabel={() => `Create New`}
      onInputChange={(newValue) => setSearchQuery(newValue)}
      {...props}
      styles={customSelectStyles}
    />
  ) : (
    <Select
      options={options}
      isLoading={isFetching}
      onMenuScrollToBottom={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
      isClearable
      onInputChange={(newValue) => setSearchQuery(newValue)}
      {...props}
      styles={customSelectStyles}
    />
  );
};
