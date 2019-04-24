export const checkValidityInput = (values, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = values.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = values.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = values.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(values) && isValid;
    }
  
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(values) && isValid;
    }
    return isValid;
  };

  export const adminLink = [
    { title: "Now Showing", linkTo: "/admin/now_showing" },
    { title: "Featured", linkTo: "/admin/featured" },
    { title: "View Likes", linkTo: "/admin/vote" },
    { title: "About Us", linkTo: "/admin/about" }
  ];
  