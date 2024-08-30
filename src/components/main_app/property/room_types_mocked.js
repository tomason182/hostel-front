export const roomTypes = [
  {
    _id: "00001",
    description: "Cuarto compartido 6 camas mixto",
    type: "Dorm",
    gender: "mixed",
    bathroom: "share",
    max_occupancy: 6,
    inventory: 3,
    base_rate: 12,
    currency: "USD",
    products: [
      {
        room_name: "Room 01",
        beds: [],
      },
      {
        room_name: "Room 02",
        beds: [],
      },
      {
        room_name: "Room 03",
        beds: [],
      },
    ],
  },
  {
    _id: "00002",
    description: "Cuarto compartido 4 camas femenino",
    type: "Dorm",
    gender: "female",
    bathroom: "share",
    max_occupancy: 4,
    inventory: 2,
    base_rate: 14,
    currency: "USD",
    products: [
      {
        room_name: "Room 01",
        beds: [],
      },
      {
        room_name: "Room 02",
        beds: [],
      },
    ],
  },
];
