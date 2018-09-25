export const getCoordinates = marker => ({
    lat: Number(marker.lat),
    lng: Number(marker.lng)
})

export const getDefaultCoordinates = () => ({
  lat: 55.718035, lng: 12.470284
})
