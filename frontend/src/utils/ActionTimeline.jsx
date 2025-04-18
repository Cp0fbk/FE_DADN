import dayjs from "dayjs";

export default function ActionTimeline({ scheduledTimes }) {
  return (
    <div className="relative border-l-2 border-blue-500 pl-6 space-y-1.5">
      {scheduledTimes.map((item) => (
        <div key={item._id} className="relative">
          <div className="absolute -left-8 top-1/38 transform w-4 h-4 bg-blue-500 rounded-full"></div>

          <div className="bg-white text-black p-4 rounded-lg shadow-md">
            <h3 className="font-semibold capitalize">
              {item.action.replace("/", " set value to ")}
            </h3>
            <p className="text-sm">
              {dayjs(item.time).format("M/D/YYYY, h:mm:ss A")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
