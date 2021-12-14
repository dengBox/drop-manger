import { Options } from './interface/options';
import { DropState } from './interface/state';
import '../docs/scss/index.scss';
export default class DropManger {
    dropState: DropState;
    constructor(options: Options);
    _init(opt: Options): void;
    destory(): void;
    startStart(): void;
    startMove(): void;
    startEnd(): void;
    margeConfig(target: any, options: any): void;
}
