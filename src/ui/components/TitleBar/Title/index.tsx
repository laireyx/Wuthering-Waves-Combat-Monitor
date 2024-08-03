import { useResource } from '../../../hooks/useResource';

import { titleStyle } from '../index.css';

export default function Title() {
  const strings = useResource<ApplicationStrings>('strings');

  return <div className={titleStyle}>{strings.titleBar}</div>;
}
