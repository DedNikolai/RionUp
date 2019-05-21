import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as Bee } from '../../img/icons/bee.svg'
import SectionItem from './SectionItem'
import MobileHeader from '../../components/MobileHeader'
import bag from '../../img/icons/bag.svg'
import './businesses-events.scss'
import { getCurrentPlaceById } from '../../store/places/operations'
import {getBusinessesByCategory} from '../../store/businesses/operations'
import {getEventsByPLace} from '../../store/events/operations'

class BusinessesEvents extends Component {
  componentDidMount () {
    const {getEventsByPLace, getCurrentPlaceById} = this.props
    const placeId = +this.props.match.params.placeId
    getCurrentPlaceById(placeId)
    getEventsByPLace(placeId)
  }

  getBusinenessesByCategory (id) {
    const {getBusinessesByCategory} = this.props
    getBusinessesByCategory(id)
  }

  render () {
    const {businesses, events, currentPlaceById, isLoaded} = this.props
    const businessesList = businesses.map(item => {
      return <SectionItem key={item.id} item={item}/>
    })
    const eventsList = events.map(item => {
      return <SectionItem key={item.id} item={item}/>
    })
    const bgImageURL = 'https://i.lb.ua/121/60/5b1501c46a520.jpeg'

    let menuItems = []
    if (isLoaded) {
      menuItems = currentPlaceById.placeCategory.businessCategories.map(item => {
        return (
          <li key={item.id} className="menu-item" onClick={() => this.getBusinenessesByCategory(item.id)}>
            <div className="menu-item_icon"><img src={item.imageUrl} alt={item.name}/></div>
            <div className="menu-item_text">{item.name}</div>
          </li>
        )
      })
    }
    return (
      <div className="businesse-container parallax-container">
        <MobileHeader header="Malls" location="Sky Mall" bgImage={bgImageURL} icon={bag} />
        <div className="content">
          <div className="navbar">
            <h2 className="section-title">Explore</h2>
            <ul className="menu">
              {menuItems}
            </ul>
          </div>
          <div className="businesses section">
            <div className="section-header">
              <h2 className="section-title">Popular near home</h2>
              <h4 className="side-title">See all</h4>
            </div>
            <div className="section-list">
              {businessesList}
            </div>
          </div>
          <div className="events section">
            <div className="section-header">
              <h2 className="section-title">Events</h2>
              <div className="side-icon"><Bee/></div>
            </div>
            <div className="section-list">
              {eventsList}
            </div>
          </div>
          <div className="place-messages section">
            <h2 className="section-title">
              Leave a place message
            </h2>
            <div className="place-messages__input">
              <form>
                <div className="place-messages__container">
                  <textarea
                    name="place-messages__text-area"
                    id="pc"
                    placeholder="Write a comment..."
                    tabIndex="1"
                    dir="auto"
                  />
                  <button className="place-messages__submit-btn">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    businesses: state.businesses.businessesByCategory,
    events: state.events.events,
    currentPlaceById: state.places.currentPlaceById,
    isLoaded: state.places.isLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByCategory: (categoryId) => dispatch(getBusinessesByCategory(categoryId)),
    getEventsByPLace: (placeId) => dispatch(getEventsByPLace(placeId)),
    getCurrentPlaceById: (placeId) => dispatch(getCurrentPlaceById(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesEvents)