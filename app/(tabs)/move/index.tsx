import { BackHeader } from "@/components/BackHeader";
import { colors } from "@/constants/Colors";
import { MovePage } from "@/pages/MovePage";

const Move = () => {
  return (
    <>
      <BackHeader backgroundColor={colors.surface[8]} />
      <MovePage />
    </>
  );
};

export default Move;
