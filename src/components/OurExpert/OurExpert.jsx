import ExpertOne from '../../assets/images/about/expert_1.png';
import ExpertTwo from '../../assets/images/about/expert_2.png';
import ExpertThree from '../../assets/images/about/expert_3.png';
import ExpertFour from '../../assets/images/about/expert_4.png';
import FacebookIcon from '../../assets/images/about/facebook_icon.png';
import TwitterIcon from '../../assets/images/about/twitter_icon.png';
import InstagrtamIcon from '../../assets/images/about/instagram_icon.png';
import './OurExpert.css';


function OurExpert(){

    const experts = [
        {
            id: 'expert_1',
            name: 'Olivia Disosa',
            designation: 'CEO',
            image: ExpertOne,
            description: 'Olivia Disosa',
            facebookIcon: FacebookIcon,
            twitterIcon: TwitterIcon,
            instagramIcon: InstagrtamIcon 
        },
        {
            id: 'expert_2',
            name: 'Martina George',
            designation: 'Project Manager',
            image: ExpertTwo,
            description: 'Martina George',
            facebookIcon: FacebookIcon,
            twitterIcon: TwitterIcon,
            instagramIcon: InstagrtamIcon 
        },
        {
            id: 'expert_3',
            name: 'Amelia Jack',
            designation: 'Production Controller',
            image: ExpertThree,
            description: 'Amelia Jack',
            facebookIcon: FacebookIcon,
            twitterIcon: TwitterIcon,
            instagramIcon: InstagrtamIcon 
        },
        {
            id: 'expert_4',
            name: 'Daisy Arthur',
            designation: 'Store Manager',
            image: ExpertFour,
            description: 'Daisy Arthur',
            facebookIcon: FacebookIcon,
            twitterIcon: TwitterIcon,
            instagramIcon: InstagrtamIcon 
        }
    ]

    return(
        <section id="our_expert" className="our_expert py-10 bg-white">
            <div className="container max-w-[1320px] mx-auto px-4">
                <div className="section_content_wrapper">
                    <div className="section_header text-center">
                        <h5 className="text-[17px] font-urbanist text-brown-600 uppercase tracking-widest">Expert Spotlight</h5>
                        <h2 className="text-[45px] font-bold text-black leading-14 tracking-normal mb-2">Meet Our Experts</h2>
                    </div>
                    <div className="our_team_row flex flex-wrap items-start justify-center mt-10">
                        {experts.map((expert) => (
                            <div key={expert.id} className="our_team_box w-1/4 px-5">
                                <div className='expert_img_wrapper overflow-hidden relative'>
                                    <div className='overlay absolute left-0 -bottom-10 w-full bg-black blur-xl z-1'></div>
                                    <img className="w-full" src={expert.image} alt={expert.description} />
                                    <div className='expert_social_links z-2'>
                                        <a href="#" className='social_link facebook'><img src={expert.facebookIcon} alt="Facebook Icon" /></a>
                                        <a href="#" className='social_link twitter'><img src={expert.twitterIcon} alt="Twitter Icon" /></a>
                                        <a href="#" className='social_link instagram'><img src={expert.instagramIcon} alt="Instagram Icon" /></a>
                                    </div>
                                </div>
                                <div className='text_wrapper text-center mt-4'>
                                    <h4 className='expert_name text-[20px] font-medium text-black'>{expert.name}</h4>
                                    <p className='expert_designtion font-urbanist text-brown-600 text-[14px]'>{expert.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurExpert;