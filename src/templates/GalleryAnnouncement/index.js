import React from 'react';
import './styles.css';

import ImageGallery from 'react-image-gallery';

export default function GalleryAnnouncement(){
    const images = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
          thumbnailClass: 'thumbnail',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
          thumbnailClass: 'thumbnail'
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
          thumbnailClass: 'thumbnail'
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
          thumbnailClass: 'thumbnail'
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
          thumbnailClass: 'thumbnail'
        }
      ];
    return (
        <div className="gallery-announcement">
            <ImageGallery items={images}/>
        </div>
    )
}