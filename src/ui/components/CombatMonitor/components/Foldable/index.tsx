import { useState } from 'react';

import { foldableStyle, foldableTitleStyle } from './index.css';

type FoldableProps = React.PropsWithChildren<{
  title: string;
}>;

export default function Foldable({ title, children }: FoldableProps) {
  const [folded, setFolded] = useState(false);

  return (
    <div className={foldableStyle}>
      <div className={foldableTitleStyle} onClick={() => setFolded(!folded)}>
        {title}
      </div>
      {folded || children}
    </div>
  );
}
