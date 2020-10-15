import { expose } from 'comlink';
import MainWorker from './worker';

const exports = MainWorker;
export type MainWorkerType = typeof MainWorker;

expose(exports);