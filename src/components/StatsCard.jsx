export default function StatsCard({ title, value }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
