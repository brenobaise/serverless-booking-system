"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

export default function DashboardBookingSearch({ onResults }) {
  const [query, setQuery] = useState("");

  const searchBookings = debounce(async (email) => {
    if (!email.includes("@")) {
      onResults([]); // trigger fallback to show all
      return;
    }

    try {
      const res = await axios.get(`/api/bookings/${email}`);
      const data = Array.isArray(res.data) ? res.data : [res.data];
      onResults(data);
    } catch (err) {
      console.error("Search failed:", err.message);
      onResults([]); // No match, fallback to all
    }
  }, 500);

  useEffect(() => {
    searchBookings(query);
    return () => searchBookings.cancel();
  }, [query]);

  return (
    <div className='p-3 rounded-md max-w-md sm:w-auto flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
      <input
        type='text'
        placeholder='Search by user email...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-3 border rounded shadow-sm'
      />
    </div>
  );
}
