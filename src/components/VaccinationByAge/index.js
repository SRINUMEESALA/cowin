import React, {PureComponent} from 'react'
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default class VaccinationByAge extends PureComponent {
  render() {
    const {vaccinByAge} = this.props
    let VBA
    if (vaccinByAge === undefined) {
      VBA = []
    } else {
      VBA = vaccinByAge.map(obj => ({name: obj.age, value: obj.count}))
    }
    // console.log(VBA)
    return (
      <>
        <h1 className="mt-3 h3 text-white">Vaccination by Age</h1>
        <ResponsiveContainer width={400} height={400} className="text-center">
          <PieChart width={400} height={400}>
            <Legend iconType="circle" />
            <Pie
              data={VBA}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="70%"
              fill="#8884d8"
              dataKey="value"
            >
              {VBA.map((entry, index) => (
                <Cell
                  key={`cell-${index + 1}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </>
    )
  }
}
