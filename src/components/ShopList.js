import React from 'react'
import ShopPreview from './ShopPreview'
import GoogleMaps from './GoogleMaps'

class ShopList extends React.Component {
  constructor() {
    super()
    this.state = {
      visibleShops: [],
      bounds: {
        b: {
          b: 0,
          f: 0
        },
        f: {
          b: 0,
          f: 0
        }
      }
    }
  }

  filterShops(shop) {
    let {lat, lng} = shop.coordinates
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    const {f, b} = this.state.bounds
    return (!f || !b) || ((lat >= f.b) && (lat <=f.f) && (lng >= b.b) && (lng <= b.f))
  }

  setBoundsState(bounds) {
    this.setState({
      ...this.state,
      bounds: {
        b: {
          b: bounds.b.b,
          f: bounds.b.f
        },
        f: {
          b: bounds.f.b,
          f: bounds.f.f
        }
      }
    })
  }

  render() {
      const {shops, onFavoriteClick, isShopsRequested} = this.props
      let mapRef1
      let mapBoundsChange=false
      let bounds
      return (
        <div>
          <GoogleMaps markers={shops.map(
            shop => shop.coordinates
          )}
          mapRef={map => mapRef1 = map}
          onBoundsChanged={
            () => {
              bounds = mapRef1.getBounds()
              if (mapBoundsChange) return
              mapBoundsChange = true
              setTimeout(() => {
                mapBoundsChange = false;
                this.setBoundsState(bounds)
              }, 300)
            }
          }
          />
          <hr></hr>
          {isShopsRequested ? <div>Loading...</div>:
            <div>
              {shops
                .filter(this.filterShops.bind(this))
                .map(element=>
                  <ShopPreview
                    key={element.id}
                    shop={element}
                    onFavoriteClick= { ()=>{onFavoriteClick(element.id)} }
                  />
                )
              }
            </div>
          }
        </div>
      )
  }
}


export default ShopList
