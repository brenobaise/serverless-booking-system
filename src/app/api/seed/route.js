import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import Booking from "@/app/models/Booking";
import StoreConfig from "@/app/models/StoreConfig";

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    console.log("Connected to MongoDB.");

    // Clear existing data
    await Service.deleteMany({});
    await Booking.deleteMany({});
    await StoreConfig.deleteMany({});
    console.log("Existing data cleared.");

    // Seed Store Configuration
    const storeConfig = {
      Open_times: {
        Monday: "08:00-16:00",
        Tuesday: "08:00-16:00",
        Wednesday: "08:00-16:00",
        Thursday: "08:00-16:00",
        Friday: "08:00-16:00",
        Saturday: "10:00-14:00",
        Sunday: "Closed",
      },
      max_bookings_per_slot: 2,
    };

    const createdStoreConfig = await StoreConfig.create(storeConfig);
    console.log("Store configuration seeded:", createdStoreConfig);

    // Seed Services
    const services = [
      {
        name: "Haircut",
        small_description: "Basic haircut service.",
        large_description: "A detailed haircut tailored to your preferences.",
        price: 25.0,
        sm_img_url: "https://example.com/small-haircut.jpg",
        xl_img_url: "https://example.com/large-haircut.jpg",
        isAvailable: true,
        numOfTimesBooked: 0,
        duration: 30,
      },
      {
        name: "Tattoo Design",
        small_description: "Custom tattoo designs.",
        large_description: "A creative session to design your next tattoo.",
        price: 100.0,
        sm_img_url: "https://example.com/small-tattoo.jpg",
        xl_img_url: "https://example.com/large-tattoo.jpg",
        isAvailable: true,
        numOfTimesBooked: 0,
        duration: 60,
      },
    ];

    const createdServices = await Service.insertMany(services);
    console.log("Services seeded:", createdServices);

    // Seed Bookings (Optional)
    const bookings = [
      {
        user_email: "testuser1@example.com",
        slot_date: new Date("2025-01-10T10:00:00"),
        Service_id: createdServices[0]._id,
        total_price: createdServices[0].price,
      },
      {
        user_email: "testuser2@example.com",
        slot_date: new Date("2025-01-10T11:00:00"),
        Service_id: createdServices[1]._id,
        total_price: createdServices[1].price,
      },
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log("Bookings seeded:", createdBookings);

    return new Response(
      JSON.stringify({ message: "Seeding completed successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding database:", error.message);
    return new Response(
      JSON.stringify({ error: "Seeding failed!", details: error.message }),
      { status: 500 }
    );
  }
}
