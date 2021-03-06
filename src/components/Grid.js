import React from 'react';
import PropTypes from 'prop-types';
import createProps from './createProps';
import getClass from './classNames';

const propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node,
};

export default function Grid({ limit, gutter, ...props }) {
  const style = { maxWidth: limit, marginLeft: gutter, marginRight: gutter };
  const containerClass = getClass(
    props.fluid ? 'container-fluid' : 'container'
  );
  const classNames = [props.className, containerClass];

  return React.createElement(
    props.tagName || 'div',
    createProps(propTypes, { ...props, style }, classNames)
  );
}

Grid.propTypes = propTypes;
