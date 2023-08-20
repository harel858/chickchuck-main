"use client";
import React, { useCallback, useEffect, useState } from "react";
import ClientItem from "@components/clients/ClientItem";
import NoClients from "@components/clients/NoClients";
import SearchClient from "@components/clients/SearchClient";
import { CustomerItem } from "types/types";

function Clients({ customers }: { customers: CustomerItem[] }) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<CustomerItem[]>([]);
  useEffect(() => {
    if (!searchQuery) return;
    const handleSearch = () => {
      setLoading(true);
      const filteredEvents = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phoneNumber.includes(searchQuery.toLowerCase())
      );
      setSearchResult(filteredEvents);
      return setLoading(false); // Set isLoading to false after fetching data
    };
    handleSearch();
  }, [searchQuery]);

  const onSearchChange = useCallback(
    (value: string) => {
      console.log(value);

      setSearchQuery(value);
    },
    [searchQuery, setSearchQuery]
  );
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-0 pt-5 w-full max-lg:w-full">
      <nav className="flex flex-row-reverse max-md:flex-col max-md:items-start flex-wrap content-center justify-center items-center font-extralight w-full relative top-0 p-3 px-10 gap-2 transition-all duration-1000 ease-in-out">
        <SearchClient
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
        />
      </nav>
      <div className="flex h-full w-full items-stretch max-xl:items-center justify-center max-xl:flex-col">
        {(customers?.length === 0 && !searchQuery) || !customers ? (
          <NoClients title={"You don't have any customers yet"} />
        ) : !searchQuery && customers?.length > 0 ? (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {customers.map((customer, i) => (
              <ClientItem key={customer.id} i={i} customer={customer} />
            ))}
          </ul>
        ) : (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {searchResult.map((customer, i) => (
              <ClientItem key={customer.id} i={i} customer={customer} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Clients;
