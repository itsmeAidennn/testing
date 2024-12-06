import style from '../../../styling/LandingPage/HomeSection/SlidingImages.module.css'
import UDM from '../../../media/1.JPG';
import Building from '../../../media/2.JPG';
import Mehan from '../../../media/3.JPG';
import Students from '../../../media/4.JPG';

const SlidingImage = ({slideNumber, startAnimation}) => {
  const images = [UDM, Building, Mehan, Students]
  return (
    // <img className={`img-slide ${startAnimation ? 'imageUncover' : 'imageCover'}`} src={images[slideNumber - 1]} alt='Background' />
    <div 
      className={`${style.imgSlide} ${startAnimation ? style.imageUncover : style.imageCover}`}
      style={{
        backgroundImage:`linear-gradient(rgba(27, 109, 61, 0.3), rgba(27, 109, 61, 0.3)), url(${images[slideNumber - 1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )
}

export default SlidingImage;