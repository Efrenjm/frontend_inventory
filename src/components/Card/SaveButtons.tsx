"use client";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { title } from "@/theme";
// import AnimatedButton from "@/components/animations/AnimatedButton";

const AnimatedButton = dynamic(() => import("@/components/animations/AnimatedButton"), {
  ssr: false,
});

interface SaveButtonsProps {
  isEditable: boolean;
  isLoading: boolean;
  handleSaveItem: (e: MouseEvent) => void;
  handleCreateNextItem?: (e: MouseEvent) => void;
}

export default function SaveButtons({
  isEditable,
  isLoading,
  handleSaveItem,
  handleCreateNextItem,
}: SaveButtonsProps) {
  const router = useRouter();

  return (
    <>
      {isEditable ? (
        <Box display="flex" justifyContent="center">
          <AnimatedButton
            isLoading={isLoading}
            onClick={handleSaveItem}
            text={"Save item"}
            icon={"save"}
            typeProps={{ fontFamily: title.style.fontFamily, fontWeight: "bold" }}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          sx={{ width: "100%", alignContent: "space-evenly", justifyContent: "space-evenly" }}
        >
          <AnimatedButton
            onClick={() => router.push("/items")}
            text="Go back"
            icon="back_white"
            iconSize={28}
            typeProps={{
              display: { xs: "none", sm: "none", md: "block" },
            }}
          />
          <AnimatedButton
            onClick={handleCreateNextItem}
            text={"Add another"}
            icon={"add_white"}
            iconSize={28}
            typeProps={{
              display: { xs: "none", sm: "none", md: "block" },
            }}
          />
        </Box>
      )}
    </>
  );
}
