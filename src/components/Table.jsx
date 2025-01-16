export default function Table() {
  const data = [
    { service: "Website Design", date: "2025-01-10", total: "$300" },
    { service: "SEO Optimization", date: "2025-01-12", total: "$150" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-sm md:text-base">Service</th>
            <th className="border p-2 text-sm md:text-base">Date</th>
            <th className="border p-2 text-sm md:text-base">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2 text-sm md:text-base">{row.service}</td>
              <td className="border p-2 text-sm md:text-base">{row.date}</td>
              <td className="border p-2 text-sm md:text-base">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
