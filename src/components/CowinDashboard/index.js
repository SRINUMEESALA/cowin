/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  success: 'Success',
  fail: 'Failed',
  load: 'loading',
}

class CowinDashboard extends Component {
  state = {data: '', apiStatus: apiStatusConstants.load}

  componentDidMount = () => {
    this.getDetails()
  }

  last7DaysToCamelCase = obj => ({
    dose1: obj.dose_1,
    dose2: obj.dose_2,
    vaccineDate: obj.vaccine_date,
  })

  getDetails = async () => {
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/covid-vaccination-data',
      options,
    )
    if (response.ok) {
      let data = await response.json()
      data = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinByAge: data.vaccination_by_age,
        vaccinByGender: data.vaccination_by_gender,
      }

      const last7DaysVaccinationUpdated = data.last7DaysVaccination.map(obj =>
        this.last7DaysToCamelCase(obj),
      )

      data = {...data, last7DaysVaccination: last7DaysVaccinationUpdated}
      this.setState({data, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderFailureView = () => (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div className="">
        <div className="">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="sizeFail"
          />
        </div>
        <h1 className="text-center">Something went wrong</h1>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    console.log(data)
    const {last7DaysVaccination, vaccinByAge, vaccinByGender} = data
    return (
      <div className="superParentCon d-flex flex-column align-items-center">
        <div className="parentCon mt-3">
          <div className="d-flex mb-3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo"
              alt="website logo"
            />
            <h1 className="h5 text-info m-0 ml-2 align-self-center">Co-WIN</h1>
          </div>
          <div className="">
            <h1 className="h3 text-primary">CoWin Vaccination In India</h1>
            <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
          </div>
          <div className="rounded barChartParent shadow mt-5 mb-5 d-flex justify-content-center align-items-center">
            <VaccinationByGender vaccinByGender={vaccinByGender} />
          </div>
          <div className="rounded barChartParent shadow mt-5  flex-column d-flex justify-content-center align-items-center">
            <VaccinationByAge vaccinByAge={vaccinByAge} />
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.fail:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }
}

export default CowinDashboard
