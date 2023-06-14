import React from 'react';
import PublicLayout from '../components/common/layout/layout';
import './pageStyles/News.css';

const News = () => {
  return (
    <PublicLayout title="News">
      <div className="news-container">
        <div className="news-item">
          <h2 className="news-title">Lorem ipsum dolor sit amet</h2>
          <p className="news-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget
            urna ut nisi dictum volutpat quis ut nulla. Sed a felis vel mi
            posuere aliquet. Aliquam id orci eget purus tincidunt eleifend.
            Nulla tristique urna sed mi accumsan, at congue tellus aliquet.
            Read more...
          </p>
        </div>
        <div className="news-item">
          <h2 className="news-title">Suspendisse potenti</h2>
          <p className="news-desc">
            Suspendisse potenti. Duis ornare fringilla eros a consequat. Nam
            ac eros nec enim porttitor hendrerit. Duis blandit nulla purus, a
            venenatis arcu vehicula a. Donec dignissim orci leo, in semper
            nunc pharetra vitae. Sed vel ultrices quam. In vitae ullamcorper
            enim. Ut rutrum est non sapien scelerisque, non malesuada enim
            vulputate. Read more...
          </p>
        </div>
        <div className="news-item">
          <h2 className="news-title">Vivamus consectetur nisl</h2>
          <p className="news-desc">
            Vivamus consectetur nisl eu enim ultrices, quis posuere justo
            interdum. Suspendisse mollis dolor in neque aliquam consequat. In
            sed ante vel nisi ullamcorper posuere. Vestibulum eget ultricies
            arcu. Aliquam nec pretium risus. Donec aliquam, nunc a finibus
            bibendum, diam leo convallis lacus, id pretium orci turpis quis
            metus. Read more...
          </p>
        </div>
        <div className="news-item">
          <h2 className="news-title">Pellentesque habitant morbi tristique senectus</h2>
          <p className="news-desc">
            Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Vestibulum non justo sit amet
            nisi blandit vestibulum. Donec porttitor neque eu leo facilisis,
            in aliquet tellus volutpat. Integer in quam enim. Donec quis
            ligula ut odio pharetra malesuada sed ut lectus. Aenean eget
            euismod odio. Duis ut faucibus purus. Nam viverra dolor id quam
            rhoncus tristique. Read more...
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default News;
