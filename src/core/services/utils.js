export function arrayRemove(arr, value) { 
  return arr.filter(function(ele){ 
      return ele !== value; 
  });
}

export function arrayMin(arr) {
  return arr.reduce(function (p, v) {
    return ( p < v ? p : v );
  });
}

export function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}
