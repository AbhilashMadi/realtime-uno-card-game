import { FC } from "react";
import { useParams } from "react-router-dom";

const RoomPage: FC = () => {
  const { room_id } = useParams<{ room_id: string }>();

  return <section>ROOM: {room_id}</section>;
};

export default RoomPage;
