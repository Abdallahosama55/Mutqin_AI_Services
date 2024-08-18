//Modules
import { Stack } from "react-bootstrap";
import { useBreakpoint } from "use-breakpoint";

//Files
import Card from "@/components/molecules/Card";
import CustomAccordion from "@/components/atoms/Accordion";
import { BREAKPOINTS } from "@/helpers/constants";
import { useTextLength } from "../hooks/context/EditorTextLength";

const LeftPanel = ({ editor }) => {
  //Responsive
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  const isBelowDesktop = breakpoint !== "desktop";
  const { textLength } = useTextLength();

  return (
    <Stack
      direction="vertical"
      gap={4}
      className={`h-100 ${isBelowDesktop && "mt-3"}`}
    >
      <div>
        <Card>
          <div
            style={{ fontSize: "16px", fontWeight: "600" }}
            className="text-primary   text-center"
          >
            مساعد مُتقِن
          </div>
        </Card>
      </div>
      <div className={`flex-fill ${isBelowDesktop && "mb-20"}`}>
        <Card className="h-100 p-3 px-4">
          <CustomAccordion editorLength={textLength} editor={editor} />
        </Card>
      </div>
    </Stack>
  );
};

export default LeftPanel;
