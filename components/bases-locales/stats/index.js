import React from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2'

import Section from '../../section'
import Mapbox from '../../mapbox'

import BalMap from '../bal-map'
import Pie from '../pie'
import Counter from '../counter'

class BasesLocales extends React.PureComponent {
  render() {
    const {stats} = this.props
    const conformBal = (100 / stats.balNb) * stats.conformNb

    return (
      <div>
        <Section title='Déploiement des bases locales'>
          <Mapbox>
            {(map, marker, popUp) => (
              <BalMap
                map={map}
                popUp={popUp}
                data={stats.bal}
                regions={stats.regions}
              />
            )}
          </Mapbox>
        </Section>

        <Section title='Bases locales déjà publiées' background='white'>
          <div className='stats'>
            <div className='stat'>
              <Counter
                value={stats.balNb}
                title='Bases locales déjà publiées'
              />

              <Counter
                value={conformBal}
                unit='%'
                color={conformBal < 20 ? 'error' : conformBal < 50 ? 'warning' : 'success'}
                title='Bases locales conformes'
              />
            </div>

            <div className='stat'>
              <Pie data={{
                'Licence Ouverte': stats.loNb,
                ODbL: stats.odblNb
              }} />
            </div>

            <div className='stat'>
              <Counter
                value={2267620}
                title='Adresses gérées par les collectivités'
              />
            </div>
          </div>
        </Section>

        <Section title='Évolution du nombre de BAL crée en 2018'>
          <Line data={stats.balCreationProgress} height={100} />
        </Section>

        <style jsx>{`
          .stats {
            display: flex;
            text-align: center;
            justify-content: space-around;
            align-items: center;
            flex-flow: wrap;
            margin: 2em 0;
          }

          .stat {
            margin: 0 0.5em;
            min-width: 200px;
          }
        `}</style>
      </div>
    )
  }
}

BasesLocales.propTypes = {
  stats: PropTypes.shape({
    bal: PropTypes.object.isRequired,
    regions: PropTypes.object.isRequired,
    balNb: PropTypes.number.isRequired,
    odblNb: PropTypes.number.isRequired,
    loNb: PropTypes.number.isRequired,
    conformNb: PropTypes.number.isRequired,
    balCreationProgress: PropTypes.object.isRequired
  }).isRequired
}

export default BasesLocales
