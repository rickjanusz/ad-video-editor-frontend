import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentStyles = styled.div`
  border: 1px solid red;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function AdContent({ fieldData, sizeData }) {
  // console.log('COOOOOOONTEEEEENT: ', fieldData);
  const f = []; // fields
  const h = []; // height
  const w = []; // width
  const l = []; // left
  const t = []; // top
  const styles = [];

  fieldData.forEach((fields) => {
    fields.map((field) => {
      if (field.size === sizeData) {
        f.push(field.field);

        const temp = {
          height: `${field.height}px`,
          width: `${field.width}px`,
          left: `${field.left}px`,
          top: `${field.top}px`,
        };
        styles.push(temp);
        h.push(field.height);
        w.push(field.width);
        l.push(field.left);
        t.push(field.top);

        // console.log('YAHHHOOOOOO', currentField, currentFieldProps);
      }
    });
  });
  return (
    <>
      {f.map((field, i) => (
        // console.log('YAHHHOOOOOO', t[i], w[i], h[i], l[i]);

        // console.log(mystyles);
        <ContentStyles style={styles[i]}>
          {/* <p>{field}</p>
          <p>top {t[i]}</p>
          <p>left {l[i]}</p>
          <p>height {h[i]}</p>
          <p>width {w[i]}</p> */}
        </ContentStyles>
      ))}
    </>
  );
}

AdContent.propTypes = {
  sizeData: PropTypes.string,
  fieldData: PropTypes.array,
};

// <p>{currentFieldProps.height}</p>
// <p> {currentFieldProps.width}</p>
// <p> {currentFieldProps.top}</p>
// <p> {currentFieldProps.left}</p>
