import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function ReactPDFPrint() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    onafterprint: () => alert('print success'),
  });
  return (
    <>
      <div
        ref={componentRef}
        style={{ width: '100%', height: window.innerHeight }}
      >
        <h1 className="text-center my-3 border py-2">Users</h1>
      </div>
      <button onClick={handlePrint}>print</button>
    </>
  );
}

export default ReactPDFPrint;
