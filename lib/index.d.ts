import { Options } from './interface/options';
import { DropState } from './interface/state';
import '../docs/scss/index.scss';
export default class DropManger {
    dropState: DropState;
    config: any;
    activePosition: object;
    bindEvent: {
        start: (event: any) => void;
        move: (event: any) => void;
        end: (event: any) => void;
    };
    constructor(options: Options);
    _init(opt: Options): void;
    destory(): void;
    dragStart(event: any): void;
    dragMove(event: any): void;
    dragEnd(event: any): void;
    getPosition(el: Element): void;
    margeConfig(target: any, options: any): void;
}
