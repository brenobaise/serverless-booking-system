export default function StatsCard({ title, value }) {
  return (
    <div className="p-4 bg-white rounded shadow text-center md:text-left">
      <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
    </div>
  );
}
