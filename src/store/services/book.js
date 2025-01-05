import { apiSlice } from "@/store/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.mutation({
      query: (getSlotData) => ({
        url: "/retrieve_slots",
        method: "POST", // Ensure the method is POST
        body: {
          // Use `body` instead of `params` for POST
          day: getSlotData.Date,
          start_time: getSlotData.Time,
        },
      }),
      invalidatesTags: ["Slot"], // or providesTags depending on the use case
    }),

    bookRide: builder.mutation({
      query: (bookRideData) => ({
        url: `/book`, // No query parameters in the URL
        method: "POST",
        body: {
          name: bookRideData.name,
          phone_number: bookRideData.phone, // Ensure the key matches `phone_number`
          email_id: bookRideData.email,
          day: bookRideData.day,
          start_time: bookRideData.start_time, // This will be sent as is (e.g., 22:06:53)
          pickup_location: bookRideData.pickup_location,
          destination: bookRideData.destination,
        },
      }),
      invalidatesTags: ["Book"],
    }),

    cancelBook: builder.mutation({
      query: (book_id) => ({
        url: "/cancel_booking",
        method: "POST",
        body: book_id,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: (updateData) => {
        console.log("CLICKED UPDATE");
        return {
          url: `/cart/${updateData.cartId}/item/${updateData.itemIndex}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useBookRideMutation,
  useGetSlotsMutation,
  useCancelBookMutation,
} = cartApiSlice;
