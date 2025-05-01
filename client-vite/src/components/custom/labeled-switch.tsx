import { Switch } from "@heroui/switch";
import { FC } from "react";

import { switchClassNames } from "@/components/primitives";

interface LabeledSwitchProps {
  label: string;
  description: string;
  isSelected: boolean;
  onValueChange: (value: boolean) => void;
}

const LabeledSwitch: FC<LabeledSwitchProps> = ({
  label,
  description,
  isSelected,
  onValueChange,
}) => (
  <Switch
    classNames={switchClassNames}
    isSelected={isSelected}
    onValueChange={onValueChange}
  >
    <div className="flex flex-col gap-1">
      <p className="text-medium">{label}</p>
      <p className="text-tiny text-default-400">{description}</p>
    </div>
  </Switch>
);

export default LabeledSwitch;
