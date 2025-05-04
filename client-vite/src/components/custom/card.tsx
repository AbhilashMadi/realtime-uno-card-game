import { memo, type FC } from "react";

interface ICardProps {
  id: string;
  color: string;
  value: string;
}

const Card: FC<ICardProps> = memo(({ color, value }) => {
  return (
    <div
      className="p-3 h-[150px] w-[100px] rounded-md text-xs flex flex-col justify-between"
      style={{ backgroundImage: color }}
    >
      <div className="text-start">{value}</div>
      <div className="text-center font-medium text-2xl">{value}</div>
      <div className="text-end">{value}</div>
    </div>
  );
});

Card.displayName = "Card";
export default Card;
