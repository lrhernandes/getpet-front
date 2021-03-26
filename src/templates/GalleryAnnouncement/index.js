import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';

import ImageGallery from 'react-image-gallery';

export default function GalleryAnnouncement({ann}){
  const [pic, setPic] = useState([])

  useEffect(() => {
      async function getPictures () {
        const response = await api.get(`/img/${ann.id}`).then(response => response.data);
        if(response.length>0){  
          var data = [];
          for(var i=0; i < response.length; i++){
            data.push({
              original: response[i].url,
              thumbnail: response[i].url,
              thumbnailClass: 'thumbnail'
            })
          }
          setPic(data)
        }else{
          setPic([{
            original: 'https://closekids.com.br/wp-content/uploads/2016/10/default-placeholder.png',
            thumbnail: 'https://closekids.com.br/wp-content/uploads/2016/10/default-placeholder.png',
            thumbnailClass: 'thumbnail'
          }])
        }
      }
      getPictures();
  }, [ann]);
  return (
      <div className="gallery-announcement">
          <ImageGallery items={pic}/>
      </div>
  )
}