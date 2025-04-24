import { PlopTypes } from "@turbo/gen";
import generatePackage from "./templates/generate-package";

export default function (plop: PlopTypes.NodePlopAPI) {
  generatePackage(plop);
}
