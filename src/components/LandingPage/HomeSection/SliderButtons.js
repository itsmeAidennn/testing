import style from '../../../styling/LandingPage/HomeSection/SliderButtons.module.css';

const SliderButtons = ({slideNumber, handleContentChange, startAnimationForHeaderAndSlideButtons, hideHeaderAndSlider, isSliderButtonsDisabled}) => {
  
  return (
    <div className={`${style.sliderNav} ${startAnimationForHeaderAndSlideButtons ? style.slideUpIn : style.slideDownOut} ${hideHeaderAndSlider ? style.hide : ""}`}> 
      <button className={`${style.navBtn} ${slideNumber===1? style.activeButton : ""}`} onClick={() => handleContentChange(1)} disabled={isSliderButtonsDisabled} />
      <button className={`${style.navBtn} ${slideNumber===2? style.activeButton : ""}`} onClick={() => handleContentChange(2)} disabled={isSliderButtonsDisabled} />
      <button className={`${style.navBtn} ${slideNumber===3? style.activeButton : ""}`} onClick={() => handleContentChange(3)} disabled={isSliderButtonsDisabled} />
      <button className={`${style.navBtn} ${slideNumber===4? style.activeButton : ""}`} onClick={() => handleContentChange(4)} disabled={isSliderButtonsDisabled} />
    </div>
  )
}

export default SliderButtons;