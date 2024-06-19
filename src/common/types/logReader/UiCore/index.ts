import { ClientLogImpl } from '../ClientLog';

/** Data */
export interface UiCoreDataGenericPromptView {
  type: 'PlayInterfaceAnimation';
  viewName:
    | 'GenericPromptView'
    | 'LoginView'
    | 'NetWorkMaskView'
    | 'UiView_Login'
    | 'LoadingView'
    | 'UidView'
    | 'BattleView'
    | 'PingView'
    | 'LevelUpView'
    | 'FunctionView'
    | 'ItemHintView'
    | (string & Record<never, never>);

  sequenceName:
    | 'ShowView'
    | 'Start'
    | 'Close'
    | (string & Record<never, never>);
}

export interface UiCoreDataUnknown {
  type: 'Unknown';
}

/** Log */
export interface UiCoreLog extends ClientLogImpl {
  type: 'UiCore';

  data: UiCoreDataGenericPromptView | UiCoreDataUnknown;
}
