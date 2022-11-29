import React, {PureComponent} from 'react'
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

export default class VaccinationByGender extends PureComponent {
  render() {
    const {vaccinByGender} = this.props
    let VBG
    if (vaccinByGender === undefined) {
      VBG = []
    } else {
      VBG = vaccinByGender
    }
    // console.log(vaccinByGender)
    return (
      <div className=" pb-5 d-flex flex-column justify-content-center">
        <h1 className="h3 text-white mt-3 text-center">
          Vaccination by gender
        </h1>
        <PieChart width={800} height={300} onMouseEnter={this.onPieEnter}>
          <Legend iconType="circle" />

          <Pie
            data={VBG}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="90%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="count"
          >
            {VBG.map((entry, index) => (
              <Cell
                key={`cell-${index + 0}`}
                name={entry.gender}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    )
  }
}
