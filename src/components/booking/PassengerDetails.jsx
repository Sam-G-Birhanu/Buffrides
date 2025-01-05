import { slotData } from "@/store/features/booking";
import { useBookRideMutation } from "@/store/services/book";
import { formatDate, formatTime } from "@/utlis/format";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SlotDisplay from "../slot-component/slot-component";

export default function PassengerDetails() {
  const slot = useSelector(slotData);
  const navigate = useNavigate();
  const [bookRide, { isLoading }] = useBookRideMutation();

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupCity: "",
    pickupStreet: "",
    pickupCountry: "US", // Default to US
    destinationCity: "",
    destinationStreet: "",
    destinationCountry: "US", // Default to US
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for booking confirmation
  const [confirmation, setConfirmation] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    })); // Clear error for the field
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.pickupCity.trim())
      newErrors.pickupCity = "Pickup city is required.";
    if (!formData.pickupStreet.trim())
      newErrors.pickupStreet = "Pickup street is required.";
    if (!formData.destinationCity.trim())
      newErrors.destinationCity = "Destination city is required.";
    if (!formData.destinationStreet.trim())
      newErrors.destinationStreet = "Destination street is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slot) {
      setErrors((prev) => ({
        ...prev,
        slot: "Please select a slot before booking.",
      }));
      return;
    }

    if (!validate()) return; // Stop if validation fails

    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      day: formatDate(slot.selectedDate), // Convert date to YYYY-MM-DD
      start_time: formatTime(slot.selectedTime).split(" ")[1],
      pickup_location: `${formData.pickupCity}, ${formData.pickupStreet}, ${formData.pickupCountry}`,
      destination: `${formData.destinationCity}, ${formData.destinationStreet}, ${formData.destinationCountry}`,
    };

    try {
      console.log(bookingData, "BOOKING DATA");
      const response = await bookRide(bookingData).unwrap();

      // Store the confirmation details
      setConfirmation(response);

      setTimeout(() => {
        // Navigate to home after 3 seconds
        navigate("/");
      }, 6000);

      setErrors({}); // Clear any previous errors
    } catch (error) {
      console.error("Booking error:", error);
      setErrors({ api: "Failed to book the ride. Please try again." });
    }
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Passenger Details
          </h3>

          {confirmation && (
            <div className="confirmation-box mt-30">
              <h4 className="text-green-400 text-[2rem] mb-[1rem]">
                {confirmation.message}!
              </h4>

              <p className="mt-3 mb-[2rem] text-[1.2rem] font-[600]">
                A confirmation email with the details of the ride has been sent!
              </p>
              <p className="mb-2">
                <strong>Pickup Location:</strong>{" "}
                {confirmation.booking.pickup_location}
              </p>
              <p>
                <strong>Destination:</strong> {confirmation.booking.destination}
              </p>
            </div>
          )}

          {errors.api && (
            <div className="error-box mt-30">
              <span className="text-danger">{errors.api}</span>
            </div>
          )}

          {errors.api && (
            <div className="error-box mt-30">
              <span className="text-danger">{errors.api}</span>
            </div>
          )}

          <SlotDisplay />

          <div className="form-contact form-comment wow fadeInUp">
            <form className="my-3" onSubmit={handleSubmit}>
              <div className="row">
                {/* Name */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="text-danger">{errors.phone}</span>
                  )}
                </div>

                {/* Pickup City */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="pickupCity">
                    Pickup City
                  </label>
                  <input
                    className="form-control"
                    id="pickupCity"
                    placeholder="Pickup City"
                    value={formData.pickupCity}
                    onChange={handleChange}
                  />
                  {errors.pickupCity && (
                    <span className="text-danger">{errors.pickupCity}</span>
                  )}
                </div>

                {/* Pickup Street */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="pickupStreet">
                    Pickup Street
                  </label>
                  <input
                    className="form-control"
                    id="pickupStreet"
                    placeholder="Pickup Street"
                    value={formData.pickupStreet}
                    onChange={handleChange}
                  />
                  {errors.pickupStreet && (
                    <span className="text-danger">{errors.pickupStreet}</span>
                  )}
                </div>

                {/* Pickup Country */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="pickupCountry">
                    Pickup Country
                  </label>
                  <select
                    className="form-control"
                    id="pickupCountry"
                    value={formData.pickupCountry}
                    onChange={handleChange}
                  >
                    <option value="US">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                {/* Destination City */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="destinationCity">
                    Destination City
                  </label>
                  <input
                    className="form-control"
                    id="destinationCity"
                    placeholder="Destination City"
                    value={formData.destinationCity}
                    onChange={handleChange}
                  />
                  {errors.destinationCity && (
                    <span className="text-danger">
                      {errors.destinationCity}
                    </span>
                  )}
                </div>

                {/* Destination Street */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="destinationStreet">
                    Destination Street
                  </label>
                  <input
                    className="form-control"
                    id="destinationStreet"
                    placeholder="Destination Street"
                    value={formData.destinationStreet}
                    onChange={handleChange}
                  />
                  {errors.destinationStreet && (
                    <span className="text-danger">
                      {errors.destinationStreet}
                    </span>
                  )}
                </div>

                {/* Destination Country */}
                <div className="col-lg-6 mb-3">
                  <label className="mb-2" htmlFor="destinationCountry">
                    Destination Country
                  </label>
                  <select
                    className="form-control"
                    id="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={handleChange}
                  >
                    <option value="US">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-primary-big w-100 mt-30"
                disabled={isLoading}
              >
                {isLoading ? "Booking..." : "Book Ride"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
