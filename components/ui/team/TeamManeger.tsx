"use client";
import React, { useCallback, useEffect, useState } from "react";
import TeamItem from "./TeamItem";
import NoMembers from "./NoMembers";

import AddMember from "./AddMember";
import SearchMember from "./SearchMember";
import LargeHeading from "@ui/LargeHeading";
import {
  ActivityDays,
  Business,
  RequiredDocument,
  Treatment,
  User,
} from "@prisma/client";
import { RiCoinsLine } from "react-icons/ri";
import { Session } from "next-auth";
import { TeamOutlined } from "@ant-design/icons";
function TeamManeger({
  session,
  business,
}: {
  session: Session;
  business: Business & {
    user: (User & { activityDays: ActivityDays[] })[];
  };
}) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);

  useEffect(() => {
    if (!searchQuery) return;
    const handleSearch = () => {
      setLoading(true);
      const filteredEvents = business.user.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <TeamOutlined />
          ניהול הצוות
        </LargeHeading>{" "}
        <SearchMember
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
        />
        <div className="w-full flex flex-row-reverse justify-between items-center gap-10 max-lg:flex-col">
          <div className="flex flex-row gap-4 justify-center items-center">
            <AddMember users={business.user} businessId={business.id} />
            {/*   <AddRequiredDocuments
              businessId={user.businessId!}
              docs={Business?.RequiredDocument || []}
            /> */}
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-stretch max-xl:items-center justify-center max-xl:flex-col">
        {business.user?.length === 0 && !searchQuery ? (
          <NoMembers title={"You don't have any services yet"} />
        ) : !searchQuery && business.user?.length > 0 ? (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {business.user?.map((user, i) => (
              <TeamItem key={user.id} i={i} user={user} />
            ))}
          </ul>
        ) : (
          <ul
            className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
          >
            {searchResult.map((user, i) => (
              <TeamItem key={user.id} i={i} user={user} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TeamManeger;
