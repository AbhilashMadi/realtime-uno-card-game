import { type FC } from "react";
import { useParams } from "react-router-dom";

const RoomPage: FC = () => {
  const { room_id } = useParams();

  return <section>Room Page: {room_id}</section>;
};

export default RoomPage;
