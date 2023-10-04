import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
const Leftbar = (props) => {

  const width = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    // var ignoreClick_On_Out_side_Element = document.getElementById(
    //   'out_side_click',
    // );
    // var ignoreClick_On_Main_Nav_Element = document.getElementById(
    //   'sidebar-menu',
    // );
    document.addEventListener('click', function (event) {

      if (
        window.innerWidth <= 991


      ) {
        //Do something click is outside specified element
        document.querySelector('.page-header').className =
          'page-header close_icon';
        document.querySelector('.sidebar-wrapper').className =
          'sidebar-wrapper close_icon ';
      }
    });
  }, [width]);

  return <Fragment></Fragment>;
};

export default Leftbar;
