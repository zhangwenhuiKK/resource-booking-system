import React from "react";
import moment from "moment";
import api from "./init";

export function listRooms() {
  return api.get("http://localhost:7000/rooms").then((res) => res.data);
}
