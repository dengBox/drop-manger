import { Options, Position, unitType } from './interface/options';
import { DropState } from './interface/state';
export default class DropManger {
    _os: string;
    dropState: DropState;
    config: any;
    activePosition: Position;
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
    getPosition(el: Element, wrapEl: Element): {
        offX: number;
        offY: number;
        width: number;
        height: number;
    };
    margeConfig(target: any, options: any): void;
    converUnit(value: number, type?: unitType): string;
    changeEvent(event: any): any;
}
