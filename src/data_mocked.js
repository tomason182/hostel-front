export const property = {
  _id: "66ba803852508c4e121f1f5d",
  property_name: "The best hostel",
  address: {
    street: "Alguna calle 234",
    city: "Azul",
    postal_code: "7300",
    country_code: "AR",
  },
  contact_info: {
    phone_number: "+542281456213",
    email: "myemail@mail.com",
  },
  access_control: [
    {
      user_id: "66ba803852508c4e121f1f5c",
      role: "admin",
    },
    {
      user_id: "66ba8eab7300af884eff1a88",
      role: "employee",
    },
  ],
  createdAt: "2024-08-12T21:35:52.477Z",
  updatedAt: "2024-08-12T21:35:52.477Z",
};

export const roomTypes = [
  {
    _id: "RT0001",
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
        room_id: "RM001",
        room_name: "Room 01",
        beds: ["B0001", "B0002", "B0003", "B0004", "B0005", "B0006"],
      },
      {
        room_id: "RM002",
        room_name: "Room 02",
        beds: ["B0007", "B0008", "B0009", "B0010", "B0011", "B0012"],
      },
      {
        room_id: "RM003",
        room_name: "Room 03",
        beds: ["B0013", "B0014", "B0015", "B0016", "B0017", "B0018"],
      },
    ],
  },
  {
    _id: "RT0002",
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
        room_id: "RM004",
        room_name: "Room 01",
        beds: ["B0019", "B0020", "B0021", "B0022"],
      },
      {
        room_id: "RM005",
        room_name: "Room 02",
        beds: ["B0023", "B0024", "B0025", "B0026"],
      },
    ],
  },
  {
    _id: "RT0003",
    description: "Cuarto compartido 4 camas mixto",
    type: "Dorm",
    gender: "mixed",
    bathroom: "share",
    max_occupancy: 4,
    inventory: 3,
    base_rate: 15,
    currency: "USD",
    products: [
      {
        room_id: "RM006",
        room_name: "Room 01",
        beds: ["B0027", "B0028", "B0029", "B0030"],
      },
      {
        room_id: "RM007",
        room_name: "Room 02",
        beds: ["B0031", "B0032", "B0033", "B0034"],
      },
      {
        room_id: "RM008",
        room_name: "Room 03",
        beds: ["B0035", "B0036", "B0037", "B0038"],
      },
    ],
  },
];

export const reservations = [
  {
    _id: "R00001",
    property_id: "P00001",
    guest_id: "G0001",
    room_type_id: "RT0001",
    booking_source: "booking.com",
    check_in_date: "2024-09-10",
    check_out_date: "2024-09-13",
    number_of_guest: 2,
    total_price: 124,
    currency: "USD",
    reservation_status: "confirm",
    payment_status: "pending",
    special_request: "late check in",
    created_At: "2024-09-01",
    updated_At: "2024-09-01",
  },
  {
    _id: "R00002",
    property_id: "P00001",
    guest_id: "G0002",
    room_type_id: "RT0001",
    booking_source: "booking.com",
    check_in_date: "2024-09-11",
    check_out_date: "2024-09-13",
    number_of_guest: 1,
    total_price: 24,
    currency: "USD",
    reservation_status: "confirm",
    payment_status: "pending",
    special_request: "late check in",
    created_At: "2024-09-01",
    updated_At: "2024-09-01",
  },
  {
    _id: "R00003",
    property_id: "P00001",
    guest_id: "G0004",
    room_type_id: "RT0003",
    booking_source: "booking.com",
    check_in_date: "2024-09-11",
    check_out_date: "2024-09-13",
    number_of_guest: 1,
    total_price: 24,
    currency: "USD",
    reservation_status: "confirm",
    payment_status: "pending",
    special_request: "late check in",
    created_At: "2024-09-01",
    updated_At: "2024-09-01",
  },
];

export const users = [
  {
    _id: "U0001",
    username: "tomas@mail.com",
    first_name: "Tomas",
    last_name: "Flema",
    role: "admin",
  },
  {
    _id: "U0002",
    username: "dario@mail.com",
    first_name: "Dario",
    last_name: "",
    role: "slave",
  },
];

export const ratesAndAvailability = [
  {
    _id: "RA0001",
    room_type_id: "RT0001",
    dates: [
      {
        start_date: "2024-09-03",
        end_date: "2024-09-06",
        standard_rate: 28,
        currency: "USD",
        custom_availability: 1,
      },
    ],
  },
];

export const reservationSchedule = [
  {
    _id: "B0001",
    availability: [
      {
        reserved_by: "G0001",
        check_in_date: "2024-09-10",
        check_out_date: "2024-09-13",
      },
      {
        reserved_by: "G0002",
        check_in_date: "2024-09-15",
        check_out_date: "2024-09-19",
      },
    ],
  },
  {
    _id: "B0003",
    availability: [
      {
        reserved_by: "G0004",
        check_in_date: "2024-09-08",
        check_out_date: "2024-09-09",
      },
      {
        reserved_by: "G0005",
        check_in_date: "2024-09-20",
        check_out_date: "2024-09-22",
      },
    ],
  },
];
