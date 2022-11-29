import {Component} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

class VaccinationCoverage extends Component {
  adjustUnits = num => {
    if (num > 1000) {
      const val = num / 1000
      return `${val}k`
    }
    return num
  }

  render() {
    const {last7DaysVaccination} = this.props
    // console.log(last7DaysVaccination)
    return (
      <div className="barChartParent shadow d-flex flex-column p-5 rounded justify-content-center align-items-center">
        <h1 className="h3 text-white">Vaccination Coverage</h1>
        <ResponsiveContainer width="100%" aspect={3} className="col-10">
          <BarChart
            width={1000}
            height={300}
            data={last7DaysVaccination}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal="" vertical="" />
            <XAxis dataKey="vaccineDate" tick={{fill: 'white'}} />
            <YAxis tick={{fill: 'white'}} tickFormatter={this.adjustUnits} />
            <Tooltip
              contentStyle={{
                color: 'black',
                fontFamily: 'sans-serif',
              }}
              itemStyle={{color: 'brown'}}
            />
            <Legend iconType="square" />
            <Bar
              dataKey="dose1"
              fill="#cffafe"
              stroke="white"
              strokeWidth="1px"
              barSize="20%"
            />
            <Bar
              dataKey="dose2"
              fill="#44c4a1"
              stroke="white"
              strokeWidth="1px"
              barSize="20%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default VaccinationCoverage
