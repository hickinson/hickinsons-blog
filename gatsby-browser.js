import './src/styles/global.css'
import './src/styles/prism-atom-dark.css'
import "katex/dist/katex.min.css";
import { Prism } from "prism-react-renderer";

(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-python");

export const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps: { location },
}) => {
  const previousLocation = prevRouterProps?.location

  // Preserve Gatsby's normal behaviour for initial loads,
  // hash navigation, same-page navigation and browser Back/Forward.
  if (
    !previousLocation ||
    location.hash ||
    previousLocation.pathname === location.pathname ||
    location.action === 'POP'
  ) {
    return true
  }

  // Chromium can clamp the inherited scroll position to the bottom of a
  // shorter destination page before Gatsby's smooth reset completes.
  // Use an explicit instant reset for normal forward navigation.
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  })

  return false
}
