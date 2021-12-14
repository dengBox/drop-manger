import { LogType } from '../../src/interface/state'

export function log (errorType: LogType, msgTitle: string, msgContent: any = null): void {
  console[errorType](msgTitle, msgContent || '')
}
