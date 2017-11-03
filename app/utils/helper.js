function productHelper(product) {
  //NOTE: should use prefix _fieldName_ for new field
  if (product) {
    //add fullname field
    if (product.brandName && product.model && !product["_fullName_"])
      product["_fullName_"] = `${product.brandName} ${product.model}`;
    else if (product.model)
      //fallback
      product["_fullName_"] = product.model;
    else product["_fullName_"] = "Unnamed";

    return product;
  }
  return product;
}

function formatDate(strDate) {
  try {
    if (!strDate) return null;
    let date = new Date(strDate);
    let locale = "en-us";
    let dd = date.getDate(),
      shortMonth = date.toLocaleString(locale, { month: "short" }),
      yyyy = date.getFullYear();
    return `${shortMonth}, ${dd}, ${yyyy}`;
  } catch (e) {
    console.log(e);
    return strDate;
  }
}

function parseParamFromUrl(u) {
  try {
    let urlStr = new String(u).toString();
    let [hrefStr, paramStr] = urlStr.split("?");
    let obj = {};

    obj = _.chain(paramStr)
      .split("&") // ["a=b454","c=dhjjh","f=g6hksdfjlksd"]
      .map(_.ary(_.partial(_.split, _, "="), 1)) // [["a","b454"],["c","dhjjh"],["f","g6hksdfjlksd"]]
      .fromPairs() // {"a":"b454","c":"dhjjh","f":"g6hksdfjlksd"}
      .value();
    obj.href = hrefStr;

    return obj;
  } catch (e) {
    console.log(e);
  }
}

export { productHelper, formatDate, parseParamFromUrl };
