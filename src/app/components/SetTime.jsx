export function SetTime() {
    return (
        <div className="bg-gray-800 rounded-xl p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">Set Device Timer</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="deviceSelect" className="block mb-1">
                  Select Device
                </label>
                <select
                  id="deviceSelect"
                  className="w-full p-2 rounded bg-gray-600 text-white border border-white"
                >
                  {["Fan", "LED"].map((device, index) => (
                    <option key={index} value={device}>
                      {device}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timerInput" className="block mb-1">
                  Set Time
                </label>
                <input
                  type="time"
                  id="timerInput"
                  className="w-full p-2 rounded bg-gray-600 text-white border border-white"
                />
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white mt-2">
                Set Timer
              </button>
            </div>
          </div>
    );
}