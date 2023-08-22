

export const PointInPolygon = (
  point: { lat: number; lng: number },
  vs: { lat: number; lng: number }[]
) => {
  var x = point.lat,
    y = point.lng;

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i].lat,
      yi = vs[i].lng;
    var xj = vs[j].lat,
      yj = vs[j].lng;

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};