import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import StoreConfig from "@/app/models/StoreConfig";

export async function GET(req) {
    // 1) parse & clamp
    const { searchParams } = new URL(req.url);
    const startParam = searchParams.get("start");            // "YYYY‑MM‑DD"
    let daysParam = parseInt(searchParams.get("days") || "30", 10);
    if (!startParam || !/^\d{4}-\d{2}-\d{2}$/.test(startParam)) {
        return NextResponse.json({ error: "Invalid start" }, { status: 400 });
    }
    daysParam = Math.min(Math.max(daysParam, 1), 60);

    // 2) load store config ONCE
    await connectToDatabase();
    const cfg = await StoreConfig.findOne();
    if (!cfg) {
        return NextResponse.json({ error: "No store config" }, { status: 404 });
    }
    const open_times = Object.fromEntries(cfg.Open_times);
    const maxPerSlot = cfg.max_bookings_per_slot;

    // 3) aggregate booking counts for that window
    const startDate = new Date(startParam);
    const endDate = new Date(startParam);
    endDate.setDate(endDate.getDate() + daysParam - 1);

    const counts = await Booking.aggregate([
        { $match: { slot_date: { $gte: startDate, $lte: endDate } } },
        {
            $group: {
                _id: { date: "$slot_date", time: "$slot_time" },
                count: { $sum: 1 }
            }
        }
    ]);

    // build { "YYYY-MM-DD": { "09:00": 2, ... }, ... }
    const tally = {};
    counts.forEach(({ _id: { date, time }, count }) => {
        const iso = date.toISOString().slice(0, 10);
        tally[iso] = tally[iso] || {};
        tally[iso][time] = count;
    });

    // 4) in‑memory loop to mark disabled days
    const disabledDates = [];
    for (let i = 0; i < daysParam; i++) {
        const d = new Date(startParam);
        d.setDate(d.getDate() + i);
        const iso = d.toISOString().slice(0, 10);
        const dayName = d.toLocaleDateString("en-GB", { weekday: "long" });
        const dayCfg = open_times[dayName];

        // closed?
        if (!dayCfg || dayCfg.isClosed) {
            disabledDates.push(iso);
            continue;
        }

        // all slots full?
        const anyOpen = (Object.keys(dayCfg).filter(k => "isClosed" !== k))
            .some(time => (tally[iso]?.[time] || 0) < maxPerSlot);
        if (!anyOpen) disabledDates.push(iso);
    }

    // 5) return once
    return NextResponse.json({ disabledDates });
}
