export function firstLoad() {
  if (isDomAvailable()) {
    if (window.hasLoaded === true) {
      return false
    } else {
      window.hasLoaded = true;
      return true
    }
  } else {
    return true
  }
}

export function isDomAvailable() {
  return (
    typeof window !== "undefined" &&
    !!window.document &&
    !!window.document.createElement
  );
}

