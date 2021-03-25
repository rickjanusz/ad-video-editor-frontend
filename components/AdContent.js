import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRef } from 'react';
import getDimensions from '../utils/getDimensions';
import tmData from '../data/treatmentData';

const ContentStyles = styled.div`
  position: absolute;
  border: 1px solid rgba(255, 0, 0, 0.5);
`;

export default function AdContent({ sizeData }) {
  const f = []; // fields
  const styles = []; // props

  const lsImg = getDimensions('lifestyle_img', tmData[0]);
  const shTxt = getDimensions('subhead_text', tmData[0]);
  const hlTxt = getDimensions('headline_text', tmData[0]);

  const fieldData = [lsImg, shTxt, hlTxt];

  fieldData.forEach((fields) => {
    fields.map((field) => {
      if (field.size === sizeData) {
        f.push(field.field);
        styles.push(field.props);
      }
    });
  });

  return (
    <>
      {f.map((field, i) => (
        <ContentStyles style={styles[i]} key={field + i} />
      ))}
    </>
  );
}

AdContent.propTypes = {
  sizeData: PropTypes.any,
  props: PropTypes.any,
};
