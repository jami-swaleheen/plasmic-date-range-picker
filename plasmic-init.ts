import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { DateRangePicker } from "./components/custom/date-range-picker";
import { GlobalVariablesContext } from "./context/useGlobalVariableContext";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "q2XURTBCW7kSBbJk2SssD5",
      token:
        "l58uduzqewnRpDCK65ziixQ7Sl1a4DBL4VwOzAsrX46opqO7noBzqHuVtnpb9v0yioqi5TmalXOyYc9Q",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

PLASMIC.registerComponent(DateRangePicker, {
  props: {
    className: String,
    from: Date,
    to: Date,
  },
  name: "date-range-picker",
  displayName: "Date Range Picker",
});
PLASMIC.registerGlobalContext(GlobalVariablesContext, {
  // name should match GlobalActionsProvider contextName in the component
  name: "GlobalVariablesContext",

  // props should match GlobalVariablesProps
  props: {
    initialFromDate: Date,
    initialToDate: Date,
  },

  // providesData should be true since the context includes a DataProvider
  providesData: true,

  // globalActions should match the GlobalActionsProvider actions
  globalActions: {
    setFromDate: { parameters: [{ name: "date", type: Date }] },
    setToDate: { parameters: [{ name: "date", type: Date }] },
  },
});
