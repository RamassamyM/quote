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

export function scrollUp(event) {
  const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  if (anchor) {
    anchor.scrollIntoView({ block: 'center' });
  }
};

export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
};

export function checkACookieExists(cookieName) {
  return !!(document.cookie.split(';').some((item) => item.trim().startsWith(cookieName + '=')));
};

export function retrieveCookieValue(cookieName) {
  return document.cookie
  .split('; ')
  .find(row => row.startsWith(cookieName + '='))
  .split('=')[1];
};

export function setCookie({name, value, maxAge = 0}) {
  const maxAgeProp = maxAge === 0 ? '' : `max-age=${maxAge};`;
  document.cookie = `${name}=${value};${maxAgeProp}Secure;`;
};