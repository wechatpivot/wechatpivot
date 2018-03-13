import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Row, Col, Card } from 'antd';
const CardGrid = Card.Grid;
import * as styles from './MenuGroup.scss';


export default function MenuGroup({ dataSource, sx, sy, select }) {
  return (
    <Card noHovering>
      {dataSource.map(({ x, y, name }) => {
        const klass = cx({
          [styles.item]: true,
          [styles['item-selected']]: sx === x && sy === y,
        });
        const key = `${x},${y}`;
        return <CardGrid className={klass} key={key} onClick={() => select(x, y)}>{name}</CardGrid>;
      })}
    </Card>
  );
}

MenuGroup.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({

  })),
  select: PropTypes.func,
};
