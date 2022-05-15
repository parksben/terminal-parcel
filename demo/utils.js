exports.download = function download(onPending, onComplete) {
  let progress = 0;

  return (function downloading() {
    if (typeof onPending === 'function') {
      onPending(progress);
    }

    if (progress < 1) {
      progress += 0.01;

      setTimeout(() => {
        downloading();
      }, 100);
    } else if (typeof onComplete === 'function') {
      onComplete();
    }
  })();
};
