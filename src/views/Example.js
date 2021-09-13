import React, { useRef, useEffect, useState } from "react";
import "./Example.css";
import video from '../assets/sample-video.mp4'

const Example = () => {
  debugger
  const videoRef = useRef(null);
  const dropRefs = useRef({});
  const videoPosition = useRef({ row: 2, col: 1 });
  const [viewPort, setViewPort] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [videoState, setVideState] = useState("stopped");

  useEffect(() => {
    debugger
    handleDrag(videoPosition.current.row, videoPosition.current.col);  // 2 1

    window?.addEventListener("resize", handleViewPort);

    if (videoRef && videoRef.current) {
      videoRef.current?.addEventListener("dragstart", handleDragStart);
      videoRef.current?.addEventListener("dragend", handleDragEnd);
      videoRef.current?.addEventListener("play", handleVideo("play"));
      videoRef.current?.addEventListener("ended", handleVideo("stopped"));
    }

    return () => window?.removeEventListener("resize", handleViewPort); // cleanup function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideo = (state) => () => {
    console.log(state)
    debugger
    setVideState(state);
  };

  const handleDragStart = () => {
    videoRef?.current?.pause();
  };

  const handleDragEnd = () => {
    videoRef?.current?.play();
  };

  const handleViewPort = () => {
    setViewPort({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  const handleDrag = (row, col) => {
     const el = dropRefs?.current?.[`row-${row}#col-${col}`];
      if (el) {
        el.replaceChildren(videoRef?.current);
        videoPosition.current.col = col;
        videoPosition.current.row = row;
      }
  };

  const handleDragOver = (e) => {
    let box = {}
    const rawData = e?.target?.id
      ?.split("#")
      ?.map((data) => {
        const dataRaw = data?.split("-");
        console.log(dataRaw)
        box[dataRaw[0]] = dataRaw[1]
        return box;
      });
    if (rawData?.length) {
      handleDrag(
        rawData[0]?.row,
        rawData[1]?.col,
      );
    }
  };

  const getView = () => {
    return [1, 2].map((rowId) => (
      <div key={`row-${rowId}`} className="row">
        {[1, 2].map((colId) => (
          <div
            ref={(element) =>
              (dropRefs.current[`row-${rowId}#col-${colId}`] = element)
            }
            onDragOver={handleDragOver}
            className="drop-area"
            key={`row-${rowId}#col-${colId}`}
            id={`row-${rowId}#col-${colId}`}
            style={{
              width: viewPort.width / 2,
              height: viewPort.height / 2,
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="Example">
      <video
        controls
        ref={videoRef}
        src={video}
        draggable={true}
        width={viewPort.width / 2}
        height={viewPort.height / 2}
      />
      {getView()}
    </div>
  );
};

export default Example;
