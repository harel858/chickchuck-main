"use client";
import React, { useCallback, useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";
import NoServices from "./NoServices";
import AddServices from "./AddServices";
import SearchService from "./SearchService";
import AddRequiredDocuments from "./requiredDocuments/AddRequiredDocuments";
import LargeHeading from "@ui/LargeHeading";
import { Business, RequiredDocument, Treatment, User } from "@prisma/client";
import { RiCoinsLine } from "react-icons/ri";

function Services({
  user,
}: {
  user: User & {
    Business:
      | Business & {
          RequiredDocument: RequiredDocument[];
        };
    Treatment: (Treatment & {
      RequiredDocument: RequiredDocument[];
    })[];
  };
}) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<
    (Treatment & {
      RequiredDocument: RequiredDocument[];
    })[]
  >([]);
  console.log(user);

  useEffect(() => {
    if (!searchQuery) return;
    const handleSearch = () => {
      setLoading(true);
      const filteredEvents = user.Treatment.filter((treatment) =>
        treatment.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="flex flex-col justify-center items-center gap-10 p-0 pt-5 w-full max-lg:w-full">
      <div className="w-11/12 flex flex-col justify-center items-center gap-10">
        <LargeHeading className="flex flex-row justify-center items-center gap-2">
          My Services <RiCoinsLine />
        </LargeHeading>
        <div className="w-full flex flex-row justify-between items-center gap-10 max-lg:flex-col">
          <div className="flex flex-row gap-4 justify-center items-center">
            <AddServices
              businessId={user.businessId!}
              bussinesDocs={user.Business.RequiredDocument}
            />
            <AddRequiredDocuments
              businessId={user.businessId!}
              docs={user.Business?.RequiredDocument || []}
            />
          </div>
          <SearchService
            onSearchChange={onSearchChange}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <div className="flex h-full w-full items-stretch max-xl:items-center justify-center max-xl:flex-col">
        {(user.Treatment?.length === 0 && !searchQuery) || !user.Treatment ? (
          <NoServices title={"You don't have any services yet"} />
        ) : !searchQuery && user.Treatment?.length > 0 ? (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {user.Treatment.map((treatment, i) => (
              <ServiceItem
                key={treatment.id}
                i={i}
                treatment={treatment}
                bussinesDocs={user.Business.RequiredDocument}
              />
            ))}
          </ul>
        ) : (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {searchResult.map((treatment, i) => (
              <ServiceItem
                key={treatment.id}
                i={i}
                treatment={treatment}
                bussinesDocs={user.Business.RequiredDocument}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Services;
