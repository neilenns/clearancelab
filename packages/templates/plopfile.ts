import { NodePlopAPI } from "plop";
import generatePackage from "./generate-package";

export default function (plop: NodePlopAPI) {
  generatePackage(plop);
}
