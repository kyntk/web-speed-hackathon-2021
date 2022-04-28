import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  return (
    <div className="w-full h-full">
      <img alt={alt} className="w-full h-full object-cover object-center" src={src} loading="lazy" />
    </div>
  );
};

export { CoveredImage };
