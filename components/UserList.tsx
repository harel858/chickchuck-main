import { User } from "@prisma/client";
import { Button } from "@ui/Button";
import LargeHeading from "@ui/LargeHeading";
import React from "react";

function UserList({
  onSelectedUser,
  selectedUser,
  users,
}: {
  users: User[];
  onSelectedUser: (user: User) => void;
  selectedUser: User | null;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <LargeHeading size={"sm"} className="text-center text-base font-normal">
          ? אצל מי
        </LargeHeading>
      </div>
      <div className="w-full p-2 gap-5 flex flex-row flex-wrap items-center justify-center">
        {users.map((user) => {
          const isUserSelected = selectedUser?.id === user.id;

          const buttonClass = isUserSelected
            ? "bg-orange-200 text-black"
            : "bg-slate-950 text-white";

          return (
            <Button
              key={user.id}
              variant={"default"}
              className={`${buttonClass} w-max hover:bg-orange-200 hover:text-black rounded-lg border border-black/50`}
              onClick={() => onSelectedUser(user)}
              type={"button"}
            >
              {user.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;
