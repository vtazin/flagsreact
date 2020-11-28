import { wrap } from "comlink";
import { HelperWorkerType } from "../helper";
import HelperWorker from "../helper/helper";


class MainWorker {
  private static worker: Worker | null = null;

  static async fillCommand(flagSettings: any, colorItems: number[]) {
    if (MainWorker.worker) {
      MainWorker.worker.terminate();
    }
    let workerApi;
    if (global.Worker) {
      MainWorker.worker = new Worker("../helper", {
        name: "helper-worker",
        type: "module",
      });
      workerApi = wrap<HelperWorkerType>(MainWorker.worker);
    }
    else {
      workerApi = HelperWorker;
    }
    const result = await workerApi.fillSet(flagSettings, colorItems);
    if (MainWorker.worker !== null) {
      MainWorker.worker.terminate();
      MainWorker.worker = null;
    }
    return result;

  }
}

export default MainWorker;