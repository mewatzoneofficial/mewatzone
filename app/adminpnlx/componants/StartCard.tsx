import React from 'react'

const StartCard = () => {
  return (
     <div className="bg-white rounded-xl p-3 my-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Today's Profile View",
                value: 0,
                color: "bg-yellow-50",
                textColor: "text-yellow-600",
              },
              {
                label: "Today's Schedule Lineup",
                value: 0,
                color: "bg-blue-50",
                textColor: "text-blue-600",
              },
              {
                label: "Today's Interview Lineup",
                value: 0,
                color: "bg-red-50",
                textColor: "text-red-600",
              },
            ].map((card) => (
              <div
                key={card.label}
                className={`p-3 rounded-xl shadow-lg ${card.color} hover:shadow-xl transition`}
              >
                <h2 className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </h2>
                <p className="mt-2 text-gray-700 font-medium">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default StartCard