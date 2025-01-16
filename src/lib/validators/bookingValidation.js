import Service from "@/app/models/Service";

export async function validateBookingData({
  user_email,
  slot_date,
  Service_id,
  total_price,
}) {
  // Validate user_email
  if (!user_email || !/.+@.+\..+/.test(user_email)) {
    return "Invalid or missing user_email.";
  }

  // Validate slot_date
  const now = new Date();
  const slotDate = new Date(slot_date);
  if (!slot_date || isNaN(slotDate.getTime()) || slotDate < now) {
    return "Invalid or missing slot_date.";
  }

  // Validate Service_id asynchronously
  if (!Service_id || !/^[0-9a-fA-F]{24}$/.test(Service_id)) {
    return "Invalid or missing Service_id.";
  }

  const service = await Service.findById(Service_id);
  if (!service) {
    return "Service not found.";
  }

  // Validate total_price
  if (total_price == null || total_price < 0) {
    return "Invalid or missing total_price.";
  }

  return null; // No errors
}
