import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { generateUID } from '../../utils/helpers';

const imgTitle = [
    'You Hungry huh?',
    'How About some BBQ?',
    'Chicken?'
  ];
  
  const imgCaption = [
    'This aint Mcdonalds!',
    'Twelve hours later..',
    'Gotta make it spicy!'
  ];
  
  const imgURL = [
    'https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=1600&h=1066&q=medium://www.foodandwine.com/thmb/k1NIRDevthtQki2w8glZ7_qCUsM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/sous-vide-pork-chops-FT-RECIPE1221-3825e22b32ea4794a87d472e299b2a30.jpg',
    'https://www.washingtonian.com/wp-content/uploads/2021/07/2Fiftys-994x663.jpg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F03%2F04%2Fpopeyeschicken-2000.jpg'
  ];


const Hero = () => {
    return (
        <>     
            <Carousel>
                {imgTitle.map((title, index) => {
                    return (            
                        <Carousel.Item key={generateUID()}>
                            <img
                                className="d-block w-100"
                                src={imgURL[index]}
                                alt={title}
                                width="700"
                                height= "300"
                            />

                        <Carousel.Caption>
                            <h3>{imgTitle[index]}</h3>
                            <p>{imgCaption[index]}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })}
            </Carousel>
       </>
    )
}

export default Hero;