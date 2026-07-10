import React from "react";
import { FAQ_ITEMS } from "../../constants/data";
import { Accordion } from "../ui/Accordion";
import { SectionTitle } from "../shared/SectionTitle";

export const FAQ: React.FC = () => {
  return (
    <div className="w-full bg-[#fdfdfd] border border-stone-200/50 p-6 md:p-10 shadow-sm">
      <SectionTitle
        title="Frequently Answered Questions"
        subtitle="Help Center"
        align="left"
        className="mb-8"
      />
      <Accordion items={FAQ_ITEMS} />
    </div>
  );
};
