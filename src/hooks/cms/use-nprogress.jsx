// import { useEffect, useState } from 'react';
// import nProgress from 'nprogress';
// import { useLocation } from 'react-router-dom';

// export function useNProgress() {
//   const location = useLocation()
//   const [progress, setProgress] = useState(false)
//    const [prevLoc, setPrevLoc] = useState("")
//   useEffect(() => {
//     setPrevLoc(location.pathname)
//     nProgress.start();
//     if(location.pathname===prevLoc){
//         setPrevLoc('')
//     }
//  }, [location])

//  useEffect(() => {
//   nProgress.done();
//     setProgress(false)
//  }, [prevLoc])
// }

// src/components/ProgressBar.js
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useNavigate } from 'react-router-dom';

function ProgressBar() {
  const navigate = useNavigate();

  useEffect(() => {
    const onLeave = () => {
      NProgress.start();
    };

    const onCleanup = () => {
      NProgress.done();
    };

    navigate(onLeave);

    return onCleanup;
  }, [navigate]);

  return null;
}

export default ProgressBar;
