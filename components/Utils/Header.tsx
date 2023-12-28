"use client";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { HeaderProps } from "@types";
import { BiArrowBack } from "react-icons/bi";
import { AuthContext } from "./Clients";
import { HeaderSkelton } from "@components/Skeltons";
const Header = ({ label, showBackArrow }: HeaderProps) => {
  const router = useRouter();
  const { refresh, setRefresh, user } = useContext(AuthContext);
  const handleBack = useCallback(() => {
    router.back();
    setRefresh(!refresh);
  }, [router]);
  return (
    <>
      {user?.id ? (
        <div className="border-b-[4px] border-neutral-800 p-5">
          <div className="flex flex-row items-center gap-2">
            {showBackArrow && (
              <BiArrowBack
                size={20}
                color="white"
                onClick={handleBack}
                className="cursor-pointer hover:opacity-70 transition-all"
              />
            )}
            <h1 className="text-white text-xl font-semibold">{label}</h1>
          </div>
        </div>
      ) : (
        <HeaderSkelton />
      )}
    </>
  );
};

export default Header;
