import { wrap } from "comlink";
import { HelperWorkerType } from "../helper";
import { ColorItem } from "../../store/reducers/colorItems";

class MainWorker {
  private static worker: Worker | null = null;

  static async fillCommand(flagSettings: any, colorItems: ColorItem[]) {
    if (MainWorker.worker) {
      MainWorker.worker.terminate();
    }

    MainWorker.worker = new Worker("../helper", {
      name: "helper-worker",
      type: "module",
    });
    const workerApi = wrap<HelperWorkerType>(MainWorker.worker);
    const result = await workerApi.fillSet(flagSettings, colorItems);

    MainWorker.worker.terminate();
    MainWorker.worker = null;

    return result;
  }
}

export default MainWorker;