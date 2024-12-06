import style from'../../../styling/LandingPage/UpdateSection/UpdateSection.module.css'
import Students from '../../../media/district-1.png';
import Student from '../../../media/district-2.png';
import Jeni from '../../../media/district-3.png';
import chris from '../../../media/district-4.png';
import harvey from '../../../media/district-5.png';
import eli from '../../../media/district-6.png';
import all from '../../../media/district-7.png';

function UpdatesSection () {
    return(
        <div className={`${style.updateSectionContainer}`}>
            <div className={`${style.updateSectionTitle}`}>ANNOUNCEMENT</div>
            <div className={`${style.updateSectionDes}`}>Check News, Updates, and Requirements etc.</div>
            <div className={`${style.updateSectionSlider}`}>
                <img className={`${style.updateSectionContent1}`} src={Students} />
                <img className={`${style.updateSectionContent2}`} src={Student}/>
                <img className={`${style.updateSectionContent3}`} src={Jeni}/>
                <img className={`${style.updateSectionContent4}`} src={chris}/>
                <img className={`${style.updateSectionContent5}`} src={harvey}/>
                <img className={`${style.updateSectionContent6}`} src={eli}/>
                <img className={`${style.updateSectionContent6}`} src={all}/>
            </div>
            <div className={style.listRequirements}>
                <div className={`${style.updateSectionBox}`}>
                    <div className={`${style.updateSectionReq}`}>List of Requirements</div>
                    <ul>
                        <li> Valid ID</li>
                        <li> Parent's or Guardian Voter's ID or COMELEC Voter's Certification</li>
                        <li> Senior High Card with 2nd Quarter Grade</li>
                        <li> two (2) pieces  of 1.5 x 1.5 picture with nametag  (white background) </li>
                    </ul>
                </div>
            </div>
        </div> 
    );
}
    export default UpdatesSection;