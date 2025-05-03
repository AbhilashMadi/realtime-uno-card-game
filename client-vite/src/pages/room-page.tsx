import { type FC } from "react";
import { useParams } from "react-router-dom";

import { useGetRoomDetailsQuery } from "@/redux/services/room-api";

const RoomPage: FC = () => {
  const { room_id } = useParams();
  const { error, isFetching, data } = useGetRoomDetailsQuery({
    room_id: room_id!,
  });

  console.log(data);

  return <section>Room Page: {room_id}</section>;
};

export default RoomPage;
