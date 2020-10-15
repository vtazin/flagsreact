import { expose } from 'comlink';
import HelperWorker from './helper';

export type HelperWorkerType = typeof HelperWorker;

expose(HelperWorker);