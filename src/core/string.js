class String {
  toQueryString(params, sep, encode) {
    sep    = sep === undefined ? '&' : sep;
    encode = encode === false ? function(s) { return s; } : encodeURIComponent;

    let pairs = []
    for (let key in params) {
      pairs.push(`${key}=${encode(params[key])}`)
    }
    return pairs.join(sep)
  }
}

export default new String