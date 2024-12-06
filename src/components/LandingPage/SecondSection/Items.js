import style from '../../../styling/LandingPage/SecondSection/Items.module.css'
import ArtificialIntelligence from '../../../media/box1.png';
import DocumentProcessing from '../../../media/box2.png';
import DocumentRepository from '../../../media/box3.png';

const Items = () => {
  return (
    <div className={`${style.secondSectionBody}`}>
      <div className={`${style.box}`}>
        <img src={ArtificialIntelligence} alt="Artificial Intelligence" />
        <div className={`${style.context}`}>
          <p className={`${style.titleSecondSection}`}>
            Artificial Intelligence
          </p>
          <p className={`${style.body}`}>
            No worries! Let our AI answer all your queries regarding the admission process.
          </p>
        </div>
      </div>
      <div className={`${style.box}`}>
        <img src={DocumentProcessing} alt="Document Processing" />
        <div className={`${style.context}`}>
          <p className={`${style.titleSecondSection}`}>
            Document Processing
          </p>
          <p className={`${style.body}`}>
            Various automated features are prepared to make your admission process faster!
          </p>
        </div>
      </div>
      <div className={`${style.box}`}>
        <img src={DocumentRepository} alt="Document Repository" />
        <div className={`${style.context}`}>
          <p className={`${style.titleSecondSection}`}>
            Document Repository
          </p>
          <p className={`${style.body}`}>
            This app is for sure a keeper! It stores all your precious documents with back-ups so rest asssured.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Items;