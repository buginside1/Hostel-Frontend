import { setError, setSuccess } from "../slices/appSlice";
import {
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
} from "../slices/hostelSlice";
import axios from "axios";

// search hostel
export const searchHostelsAction =
  ({ location, person, room, d1, d2 }) =>
  async (dispatch) => {
    try {
      dispatch(setHasSearched(true));
      dispatch(setLoader(true));
      const { data } = await axios.get(
        `/api/v1/hostels?location=${location}&person=${person}&room=${room}&d1=${d1}&d2=${d2}`
      );

      dispatch(setHostels(data.hostels));
      dispatch(setLoader(false));
    } catch (err) {
      dispatch(setLoader(false));
      dispatch(setError(err.response.data.message));
    }
  };

// get featured hostels
export const getFeturedHostels = () => async (dispatch) => {
  try {
    dispatch(setHasSearched(false));
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/hostels`);

    dispatch(setHostels(data.hostels));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setLoader(false));
    dispatch(setError(err.response.data.message));
  }
};

// get hostel details
export const getHostelAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/hostel/${id}`);

    dispatch(setHostel(data.hostel));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setLoader(false));
    dispatch(setError(err.response.data.message));
  }
};

// get room details
export const getRoomAction = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/room/${id}`);
    dispatch(setRoom(data.room));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setLoader(false));
    dispatch(setError(err.response.data.message));
  }
};

// new booking
export const newBookingAction =
  (formData, hostelId, roomId) => async (dispatch) => {
    try {
      await axios.post(`/api/v1/hostel/${hostelId}/${roomId}/book`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      dispatch(setHasBooked(true));
    } catch (err) {
      dispatch(setError(err.response.data.message));
    }
  };

// users bookings
export const getUsersBookings = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get("/api/v1/me/bookings");

    dispatch(setBookings(data.bookings));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// users booking details
export const getUserBooking = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/me/booking/${id}`);

    dispatch(setBooking(data.booking));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// get all hostels -- admin
export const getAllHostels = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/hostels`);

    dispatch(setAllHostels(data.hostels));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setLoader(false));
    dispatch(setError(err.response.data.message));
  }
};

// upload hostel picture --admin
export const uploadHostelPicture = (formData, id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    await axios.put(`/api/v1/hostel/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(setSuccess("Image uploaded successfully"));
    dispatch(setHasSearched(false));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// upload room picture --admin
export const uploadRoomPicture = (formData, id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    await axios.put(`/api/v1/room/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(setSuccess("Image uploaded successfully"));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// delete hostel -- admin
export const deleteHostel = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.delete(`/api/v1/hostel/${id}`);

    dispatch(setAllHostels(data.hostels));
    dispatch(setSuccess("Hostel deleted successfully"));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// delete room -- admin
export const deleteRoom = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.delete(`/api/v1/room/${id}`);

    dispatch(setHostel(data.hostel));
    dispatch(setSuccess("Room deleted successfully"));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// create new hostel --admin
export const createHostel = (formData) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    await axios.post(`/api/v1/hostel/new`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(setSuccess("Hostel Created successfully"));
    dispatch(setIsHostelCreated(true));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// update hostel --admin
export const updateHostel = (formData, hostelId) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    await axios.put(`/api/v1/hostel/${hostelId}`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(setSuccess("Hostel Updated successfully"));
    dispatch(setIsHostelUPdated(true));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// create new room --admin
export const createRoom = (formData, hostelId) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    await axios.post(`/api/v1/hostel/${hostelId}/room/new`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(setSuccess("Room Created successfully"));
    dispatch(setIsRoomCreated(true));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// update room --admin
export const updateRoom = (formData, roomId) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    await axios.put(`/api/v1/room/${roomId}`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch(setSuccess("Room Updated successfully"));
    dispatch(setIsRoomUpdated(true));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};

// get all bookings -- admin
export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/bookings`);

    dispatch(setAllBookings(data.bookings));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setLoader(false));
    dispatch(setError(err.response.data.message));
  }
};

// change booking status --admin
export const changeBookingStatus = (status, bookingId) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `/api/v1/booking/${bookingId}`,
      { status },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch(setAllBookings(data.bookings));
  } catch (err) {
    dispatch(setError(err.response.data.message));
  }
};

// get booking details -- admin
export const getBookingDetails = (id) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const { data } = await axios.get(`/api/v1/booking/${id}`);

    dispatch(setBooking(data.booking));
    dispatch(setLoader(false));
  } catch (err) {
    dispatch(setError(err.response.data.message));
    dispatch(setLoader(false));
  }
};
