import style from '../styling/LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={`${style.ldsEllipsis}`}><div></div><div></div><div></div><div></div></div>
  )
}

export default LoadingSpinner;
