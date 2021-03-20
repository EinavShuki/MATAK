class Shape {
  constructor() {
    this.type = "Feature";
    this.properties = {
      isPermanent: false,
    };
    this.geometry = {
      type: "",
      coordinate: [],
    };
  }
}
export default Shape;
