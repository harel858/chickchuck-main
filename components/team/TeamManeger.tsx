"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BreakTime, Business, Treatment, User } from "@prisma/client";
import AddMember from "./AddMember";
import SearchUser from "./SearchUser";
import LargeHeading from "@ui/LargeHeading";
import NoMembers from "./NoMembers";
import MemberItem from "./MemberItem";
import { RiTeamLine } from "react-icons/ri";
import AddBreak from "./form/addBreaks/BreakModal";
import { TeamPageParams } from "types/types";

function TeamManeger({ business }: { business: TeamPageParams }) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<
    (User & {
      Treatment: Treatment[];
      BreakTime: BreakTime[];
    })[]
  >([]);

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
    <>
      <div className="flex flex-col justify-center items-center gap-10 p-0 pt-5 w-full max-lg:w-full">
        <div className="w-11/12 flex flex-col justify-center items-center gap-10">
          <LargeHeading className="flex flex-row justify-center items-center gap-2">
            My Team <RiTeamLine />
          </LargeHeading>
          <div className="w-full flex flex-row justify-between items-center gap-10 max-lg:flex-col">
            <div className="flex flex-row gap-4 justify-center items-center">
              <AddMember business={business} />

              <AddBreak business={business} />
            </div>
            <SearchUser
              onSearchChange={onSearchChange}
              searchQuery={searchQuery}
            />
          </div>
        </div>
        <div className="flex h-full w-full items-stretch max-xl:items-center justify-center max-xl:flex-col">
          {(business.user.length === 1 &&
            business.user[0]?.isAdmin &&
            !searchQuery) ||
          !business.user ? (
            <NoMembers title={"There are no existing team members yet"} />
          ) : !searchQuery && business.user.length > 0 ? (
            <ul
              className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
            >
              {business.user.map((user, i) => (
                <MemberItem
                  key={user.id}
                  i={i}
                  user={user}
                  allBreakTimes={business.BreakTime}
                  allServices={business.Treatment}
                />
              ))}
            </ul>
          ) : (
            <ul
              className={`flex gap-4 flex-1 w-full flex-row flex-wrap justify-evenly content-center items-center overflow-x-hidden rounded-bl-3xl rounded-br-3xl `}
            >
              {searchResult.map((user, i) => (
                <MemberItem
                  key={user.id}
                  i={i}
                  user={user}
                  allBreakTimes={business.BreakTime}
                  allServices={business.Treatment}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default TeamManeger;
