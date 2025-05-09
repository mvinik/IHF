import { useMemo } from "react";

const DivetPbBlurbContent = ({
  linkEnrolment1300x300png,
  heading4LinkNvqEnrolMENT,
  propPadding,
  propPadding1,
}) => {
  const divetPbBlurbContentStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  return (
    <div className="divet-pb-blurb-content" style={divetPbBlurbContentStyle}>
      <img
        className="link-enrolment-1-300x300png"
        loading="lazy"
        alt=""
        src={linkEnrolment1300x300png}
      />
      <div className="heading-4-link-nvq-enrolme-wrapper" style={frameDivStyle}>
        <div className="heading-4">{heading4LinkNvqEnrolMENT}</div>
      </div>
    </div>
  );
};

export default DivetPbBlurbContent;