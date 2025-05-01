import { type FC } from "react";
import { Spinner } from "@heroui/spinner";

const Loader: FC = () => {
  return (
    <div className="p-3 bg-black size-16 flex-center shadow-md rounded">
      <Spinner color="white" />
    </div>
  );
};

export default Loader;
