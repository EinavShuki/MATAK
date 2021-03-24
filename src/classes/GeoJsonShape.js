class GeoJsonShape {
  constructor(type) {
    this.type = "Feature";
    this.properties = {};
    this.geometry = {
      type: type,
      coordinate: [],
    };
  }

  addCoordinates(coordinates) {
    switch (this.geometry.type) {
      case "Polygon":
        this.geometry.coordinate = [
          [
            coordinates.map(coordinate => {
              const { lat, lng } = coordinate;
              return [lng, lat];
            }),
          ],
        ];
        break;
      case "LineString":
        this.geometry.coordinate = [
          coordinates.map(coordinate => {
            const { lat, lng } = coordinate;
            return [lng, lat];
          }),
        ];
        break;
      case "Point":
        const { lat, lng } = coordinates[0];
        this.geometry.coordinate = [lng, lat];
        break;
      default:
        break;
    }
  }
}
export default GeoJsonShape;
