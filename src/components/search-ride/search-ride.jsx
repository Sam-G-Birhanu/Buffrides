import { setBookingError, setSlotData } from "@/store/features/booking";
import { useGetSlotsMutation } from "@/store/services/book";
import { formatDate, formatTime } from "@/utlis/format";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchRide() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date()); // Initialize with current time
  const [errors, setErrors] = useState({ date: "", time: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [getSlots, { isLoading }] = useGetSlotsMutation();
  const dispatch = useDispatch();

  console.log(selectedTime, "TIME");
  console.log(selectedDate, "DATE");

  useEffect(() => {
    // Ensure the time picker defaults to the current time if none is selected
    if (!selectedTime) {
      setSelectedTime(new Date());
    }
  }, [selectedTime]);

  const validateInputs = () => {
    const newErrors = { date: "", time: "" };
    const now = new Date();

    // Validate date
    if (!selectedDate || new Date(selectedDate) < now.setHours(0, 0, 0, 0)) {
      newErrors.date = "Please select a valid date.";
    }

    // Validate time
    if (!selectedTime) {
      newErrors.time = "Please select a valid time.";
    }

    setErrors(newErrors);
    return !newErrors.date && !newErrors.time;
  };

  const handleSearchClick = async (e) => {
    e.preventDefault(); // Prevent default navigation behavior

    if (!validateInputs()) {
      return;
    }

    const getSlotData = {
      Date: formatDate(selectedDate),
      Time: formatTime(selectedTime),
    };

    try {
      const res = await getSlots(getSlotData);

      console.log(res, "response please");
      if (res?.status === "available") {
        navigate("/booking-passenger");
        dispatch(setSlotData({ selectedTime, selectedDate }));
      } else {
        dispatch(
          setBookingError(
            "The selected slot is unavailable. Please choose another slot."
          )
        );
        setMessage(
          "The selected slot is unavailable. Please choose another slot."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage(
        "An error occurred while checking the slot. Please try again."
      );
    }
  };

  return (
    <div className="box-search-ride w-full  flex items-center justify-between wow fadeInUp">
      {/* {message && <p className="text-red-500 text-sm mt-2">{message}</p>} */}

      <div className="search-item search-date">
        <div className="search-icon">
          <span className="item-icon icon-date"> </span>
        </div>
        <div className="search-inputs">
          <label className="text-14 color-grey">Date</label>
          <DatePicker
            format="MMMM DD YYYY"
            value={selectedDate}
            onChange={setSelectedDate}
          />
          {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        </div>
      </div>
      <div className="search-item search-time">
        <div className="search-icon">
          <span className="item-icon icon-time"> </span>
        </div>
        <div className="search-inputs">
          <label className="text-14 color-grey">Time</label>
          <DatePicker
            disableDayPicker
            format="hh:mm:ss A"
            value={selectedTime}
            onChange={setSelectedTime}
            plugins={[<TimePicker />]}
          />
          {errors.time && <p className="text-red-500 text-xs">{errors.time}</p>}
        </div>
      </div>
      <div className="search-item search-button">
        <button
          className="btn btn-search"
          onClick={handleSearchClick}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? ( // Show loading spinner or text while loading
            <span>Searching...</span>
          ) : (
            <>
              <img
                src="/assets/imgs/template/icons/search.svg"
                alt="Buff Rides"
              />
              Search Slot
            </>
          )}
        </button>
      </div>
    </div>
  );
}
