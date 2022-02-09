import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

function parseVideoSource(source) {
  const matches = source.match(
    /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
  );
  // the above pattern is supposed to match any possible youtube URL
  // if there is no match, this source doesn't point to a youtube video
  const isFromYoutube = !!matches;

  const ext = isFromYoutube ? null : source.split('.').pop();

  return {
    source,
    videoId: (isFromYoutube && matches[1]) || null,
    isFromYoutube,
    ext
  };
}

const VideoWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

& > .print-description {
  display: none;
}

@media print {
  & iframe {
    display: none;
  }
  & video {
    display: none;
  }

  & > .print-description {
    display: block;
  }
}
`;


function Video({ videoUrl, alt }) {
  const ORIGIN = window.location.href;
  const { source, videoId, isFromYoutube, ext } = parseVideoSource(videoUrl);

  const QRCodeUrlParams = new URLSearchParams({
    cht: 'qr',
    chs: '150x150',
    chl: source
  }).toString();
  const QRCodeImgSrc = `https://chart.googleapis.com/chart?${QRCodeUrlParams}`;


  return (
    <VideoWrapper>
      {isFromYoutube &&
        <iframe class="no-print" type="text/html"
          width="640" height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=${ORIGIN}`}
          frameborder="0"
        />
      }

      {!isFromYoutube &&
        <video width="640" class="no-print" controls>
          <source src={source} type={`video/${ext}`} />
        </video>
      }
      <div className="print-description">
        <p>{alt}</p>
        <img src={QRCodeImgSrc} alt={alt} />
      </div>
    </VideoWrapper>
  );
}

{
  const documentVideoTags = document.querySelectorAll('.admonition.video');
  documentVideoTags.forEach((div) => {
    const img = div.getElementsByTagName('img')[0];

    const root = document.createElement('div');
    ReactDOM.render(
      <Video videoUrl={img.src} alt={img.alt} />,
      root
    );
    div.parentElement.replaceChild(root, div);
  });
}