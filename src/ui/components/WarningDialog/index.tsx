import useUIStore from '../../stores/ui';
import Card from '../Card';
import ModalDialog from '../ModalDialog';

import {
  warningCardStyle,
  warningTextStyle,
  warningTitleStyle,
} from './index.css';

export default function WarningDialog() {
  const { warning, clearWarning } = useUIStore();

  return (
    <ModalDialog isOpened={!!warning} onClose={clearWarning}>
      <Card className={warningCardStyle}>
        <h1 className={warningTitleStyle}>Warning!</h1>
        {warning?.split('\n').map((warningLine, lineNo) => (
          <p key={lineNo} className={warningTextStyle}>
            {warningLine}
          </p>
        ))}
      </Card>
    </ModalDialog>
  );
}
