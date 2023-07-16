import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hostels: undefined,
  hostel: undefined,
  hasSearched: false,
  room: undefined,
  booking: undefined,
  hasBooked: false,
  bookings: [],
  allHostels: [],
  isHostelCreated: false,
  isRoomCreated: false,
  isHostelUpdated: false,
  isRoomUpdated: false,
  allBookings: [],
};

const hostelSlice = createSlice({
  name: "hostel",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setHostels: (state, action) => {
      state.hostels = action.payload;
    },
    setHasSearched: (state, action) => {
      state.hasSearched = action.payload;
    },
    setHostel: (state, action) => {
      state.hostel = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setHasBooked: (state, action) => {
      state.hasBooked = action.payload;
    },
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
    setAllHostels: (state, action) => {
      state.allHostels = action.payload;
    },
    setIsHostelCreated: (state, action) => {
      state.isHostelCreated = action.payload;
    },
    setIsRoomCreated: (state, action) => {
      state.isRoomCreated = action.payload;
    },
    setIsHostelUPdated: (state, action) => {
      state.isHostelUpdated = action.payload;
    },
    setIsRoomUpdated: (state, action) => {
      state.isRoomUpdated = action.payload;
    },
    setAllBookings: (state, action) => {
      state.allBookings = action.payload;
    },
  },
});

export const {
  setLoader,
  setHostels,
  setHasSearched,
  setHostel,
  setRoom,
  setBookings,
  setHasBooked,
  setBooking,
  setAllHostels,
  setIsHostelCreated,
  setIsRoomCreated,
  setIsHostelUPdated,
  setIsRoomUpdated,
  setAllBookings,
} = hostelSlice.actions;

export default hostelSlice.reducer;
