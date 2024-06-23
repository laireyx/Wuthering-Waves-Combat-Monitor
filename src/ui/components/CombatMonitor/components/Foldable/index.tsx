import { useState } from 'react';

import {
  foldButtonStyle,
  foldableStyle,
  foldableTitleStyle,
} from './index.css';
import foldDown from '../../../../assets/fold-down.svg';
import foldUp from '../../../../assets/fold-up.svg';

interface FoldableButtonProps {
  folded: boolean;
}

type FoldableProps = React.PropsWithChildren<{
  title: string;
}>;

function FoldableButton({ folded }: FoldableButtonProps) {
  return <img className={foldButtonStyle} src={folded ? foldDown : foldUp} />;
}

export default function Foldable({ title, children }: FoldableProps) {
  const [folded, setFolded] = useState(false);

  return (
    <div className={foldableStyle}>
      <div className={foldableTitleStyle} onClick={() => setFolded(!folded)}>
        {title}
        <FoldableButton folded={folded} />
      </div>
      {folded || children}
    </div>
  );
}
