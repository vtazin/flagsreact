import { wrap } from "comlink";
import { MainWorkerType } from "./main";

const worker = new Worker("./main", {
    name: "main-worker",
    type: "module",
});
const workerApi = wrap<MainWorkerType>(worker);

export default workerApi;