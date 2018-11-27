import React from 'react'
import PropTypes from 'prop-types'
import FaBarChart from 'react-icons/lib/fa/bar-chart'
import Page from '../../layouts/main'

// import { _get } from '../../lib/fetch'
// import { API_BAL_URL } from '../../lib/bal/api'
import withErrors from '../../components/hoc/with-errors'

import Head from '../../components/head'
import Stats from '../../components/bases-locales/stats'

// ================ MOCK ================

import bal from '../../fake-bal.json'
import regions from '../../fake-regions.json'

const balCreationProgress = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  datasets: [
    {
      label: 'Évolution de nombre de BAL crée en 2018',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 0, 0, 0, 0, 0, 2, 11, 24, 39, 42, 58]
    }
  ]
}

const mockBalData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        bal,
        regions,
        balNb: 39,
        odblNb: 2,
        loNb: 13,
        conformNb: 6,
        balCreationProgress
      })
    }, 300)
  })
}

// ================ MOCK ================

const title = 'Statistiques de déploiement des bases locales'
const description = ''

class StatsPage extends React.Component {
  render() {
    const {stats} = this.props

    return (
      <Page title={title} description={description}>
        <Head title={title} icon={<FaBarChart />} />
        <Stats stats={stats} />
      </Page>
    )
  }
}

StatsPage.propTypes = {
  stats: PropTypes.object.isRequired
}

StatsPage.getInitialProps = async () => {
  return {
    stats: await mockBalData() // Replace with => await _get(`${API_BAL_URL}/stats`)
  }
}

export default withErrors(StatsPage)
