"use client";
import React, { useCallback, useEffect, useState } from "react";
import ClientItem from "@components/clients/ClientItem";
import NoClients from "@components/clients/NoClients";
import SearchClient from "@components/clients/SearchClient";
import { CustomerItem } from "types/types";
import LargeHeading from "@ui/LargeHeading";
import { CgProfile } from "react-icons/cg";
import { Session } from "next-auth";
import { Customer } from "@prisma/client";

function Clients({
  customers,
  session,
  accessToken,
}: {
  customers: Customer[];
  session: Session;
  accessToken: string;
}) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Customer[]>([]);
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
    <div className="flex flex-col justify-center items-center gap-4 p-0 pt-5 w-full max-lg:w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <LargeHeading
          className="flex flex-row justify-center items-baseline align-baseline gap-2"
          style={{ direction: "rtl" }}
        >
          מאגר הלקוחות <CgProfile />
        </LargeHeading>
        <SearchClient
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
        />
      </div>
      <div className="flex h-full w-full items-stretch max-xl:items-center justify-center max-xl:flex-col">
        {(customers?.length === 0 && !searchQuery) || !customers ? (
          <NoClients title={"You don't have any customers yet"} />
        ) : !searchQuery && customers?.length > 0 ? (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {customers.map((customer, i) => (
              <ClientItem
                session={session}
                key={customer.id}
                i={i}
                customer={customer}
                accessToken={accessToken}
              />
            ))}
          </ul>
        ) : (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {searchResult.map((customer, i) => (
              <ClientItem
                session={session}
                key={customer.id}
                i={i}
                customer={customer}
                accessToken={accessToken}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Clients;
